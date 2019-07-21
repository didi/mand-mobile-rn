var path = require('path')

function settingGradlePatch(mandMobilPath,natives) {
  var patch = ''

  for (native of natives) {
    patch += `
include ':${native.moduleName}'
project(':${native.moduleName}').projectDir = new File(rootProject.projectDir, '../${mandMobilPath}/${native.modulePath}')`
  }

  return {
    path: path.join('android', 'settings.gradle'),
    pattern: /include\s* \'\:app\'/,
    patch,
    noExistNotice: `Couldn't find "settings.gradle" file. Please see Doc`,
    alreadyAddedNotice: `"settings.gradle" is already linked`,
  }
}

module.exports = settingGradlePatch
