const prompt = require('inquirer').createPromptModule()
const shellJs = require('shelljs')
const path = require('path')
const bluebird = require('bluebird')
const ora = require('ora')
const moment = require('moment')
const userName = require('git-user-name')
const userEmail = require('git-user-email')
const fs = bluebird.promisifyAll(require('fs'))

// path
const CWD = process.cwd()
const COMPONENTS_PATH = path.resolve(CWD, './src/components')
const EXPECT_SHELL = path.resolve(CWD, './build/template.exp')
const COMPONENT_INDEX = path.resolve(CWD, './src/index.ts')
const STORYBOOK_COMPONENT_PATH = path.resolve(CWD, './samples/storybook/stories')
const DEMO_SCREEN_NAVIGATOR = path.resolve(CWD, './samples/src/navigation/root-navigator.js')
const DEMO_SCREEN_PATH = path.resolve(CWD, './samples/src/screen')
const DEMO_TYPE_ITEMS = '_items.js'

function init (answers) {
  return Promise.resolve(answers)
    .then(checkNoRepeat)
    .then(create)
    .then(sync)
    .catch(err => {
      console.warn(err)
    })
}

function checkNoRepeat(answers) {
  return fs.readdirAsync(COMPONENTS_PATH)
    .then(files => {
      return Promise.all(files.map(file => checkFile(COMPONENTS_PATH, file, answers.componentKebabName))).then(() => answers)
    })
}

function changeCamelToKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function sync(answers) {
  return Promise.all([syncToIndex(answers), syncToDemoNavigator(answers), syncToDemoTypeItems(answers)]).then(() =>answers)
}

function syncToIndex(answers) {
  /* 同步components/index文件 */
  fs.readFileAsync(COMPONENT_INDEX, 'utf8')
    .then(str => {
      return compile(answers, str)
    })
    .then(str => fs.writeFileAsync(COMPONENT_INDEX, str, 'utf8'))
    .then(() => answers)
}

function syncToDemoNavigator(answers) {
  fs.readFileAsync(DEMO_SCREEN_NAVIGATOR, 'utf8')
    .then(str => {
      return compile(answers, str)
    })
    .then(str => fs.writeFileAsync(DEMO_SCREEN_NAVIGATOR, str, 'utf8'))
    .then(() => answers)
}

function syncToDemoTypeItems(answers) {
  const _path = DEMO_SCREEN_PATH + '/' + answers.componentType + '/' + DEMO_TYPE_ITEMS;
  fs.readFileAsync(_path, 'utf8')
    .then(str => {
      return compile(answers, str)
    })
    .then(str => fs.writeFileAsync(_path, str, 'utf8'))
    .then(() => answers)
}

function compile(metaData, fileStr) {
  return String.prototype.replace.call(fileStr, /\/\*.*@init<%(.*)%>.*\*\//g, function (match, p1) {
    return (String.prototype.replace.call(p1, /\${(\w*)}/g, function (innMatch, innP1) {
      return metaData[innP1]
    })) + '\r' +match
  })
}

function checkFile(dir, file, name) {
  const filePath = path.resolve(dir, `./${file}`)
  return fs.statAsync(filePath)
    .then(stat => {
      if (stat.isDirectory()) {
        if (name === file) {
          return Promise.reject(`组件库中已经存在名为${name}的组件！请仔细核对后重新创建`)
        }
      }
      return
    })
}

function exec (command, argvs) {
  const spinner = ora('Loading...').start()
  const result = shellJs.exec(`${command} ${argvs.map(item => `\'${item}\'`).join(' ')} >> /dev/null`)
  spinner.succeed(['执行完毕'])
  return result
}

function create(answers) {
  exec('expect', [
    EXPECT_SHELL,
    answers.componentCnName,
    answers.componentName,
    answers.componentKebabName,
    answers.componentType,
    answers.componentDesc,
    answers.author,
    answers.time,
    COMPONENTS_PATH,
    STORYBOOK_COMPONENT_PATH,
    DEMO_SCREEN_PATH,
  ])
  return answers
}

function getUserInfo() {
  let user = userName()
  if (!user) {
    user = 'anonymous'
  }
  const email = userEmail()
  if (email) {
    user += ` <${email}>`
  }
  return user
}

function launch() {
  return prompt([
    {
      type: 'input',
      name: 'componentName',
      message: '请输入要创建的组件名称(CamelCased), 如: Button, 将自动添加 `MD` 前缀:',
      validate: function (str) {
        return /([A-Z][a-z]+)+/.test(str)
      }
    },
    {
      type: 'input',
      name: 'componentCnName',
      message: '请输入要创建的组件中文名称(中文):',
    },  
    {
      type: 'list',
      choices: [
        "basic",
        "feedback",
        "form",
        "business",
        "gesture"
      ],
      name: 'componentType',
      message: '组件类型',
    },
    {
      type: 'input',
      name: 'componentDesc',
      message: '组件描述',
    },
    {
      type: 'input',
      name: 'author',
      message: '作者',
      default: getUserInfo(),
    },
    {
      type: 'input',
      name: 'time',
      message: 'time',
      default: moment().format('YYYY年MM月DD日')
    }
  ])
    .then(answers => {
      answers = Object.assign(answers, {
        componentKebabName: changeCamelToKebab(answers.componentName)
      })
      return init(answers)
    })
}

launch()
