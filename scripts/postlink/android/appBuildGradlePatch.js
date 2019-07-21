var path = require('path')

function appBuildGradlePatch(natives) {
  var patch = ''

  for (native of natives) {
    patch += `
    implementation project(':${native.moduleName}')`
  }
  return {
    path: path.join('android', 'app', 'build.gradle'),
    pattern: /(implementation|api|compile)\s*("|')com.facebook.react:react-native:\+("|')/,
    patch,
    noExistNotice: `Couldn't find app "build.gradle" file. Please see Doc`,
    alreadyAddedNotice: `App "build.gradle" is already implemented`,
  }
}

module.exports = appBuildGradlePatch
