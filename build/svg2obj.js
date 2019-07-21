const fs = require('fs')
const path = require('path')
let SRC_DIR = process.argv[2]
let DEST_FILE = process.argv[3]

if (!fs.existsSync(SRC_DIR)) {
  SRC_DIR = path.join(__dirname, SRC_DIR)
  if (!fs.existsSync(SRC_DIR)) {
    console.error('SVG src not exists.')
    process.exit(1)
  }
}
if (!fs.existsSync(DEST_FILE)) {
  DEST_FILE = path.join(__dirname, DEST_FILE)
  if (!fs.existsSync(DEST_FILE)) {
    console.error('Destination file not exists, Please touch it.')
    process.exit(1)
  }
}

function readfile(filename) {
  const arr = filename.split('.')
  if (arr[1] !== 'svg') {
    return
  }
  let data = ''
  try {
    data = fs.readFileSync(path.join(SRC_DIR, filename), 'utf8')
    data = data
      .replace(/\<\!--\ Generated\ by\ IcoMoon.io\ --\>\n/g, '')
      .replace(/\<title\>\<\/title\>\n/g, '')
  } catch (err) {
    console.error(err)
  }
  return { [arr[0]]: data }
}

function readDir() {
  let result = {}
  try {
    const files = fs.readdirSync(SRC_DIR)
    for (const item of files) {
      Object.assign(result, readfile(item))
    }
  } catch (err) {
    console.error(err)
  }
  return result
}

const data = readDir()
const svgxmldata = 'export default ' + JSON.stringify(data)
fs.writeFileSync(DEST_FILE, svgxmldata)
