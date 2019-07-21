var findMainApplicationPath = require('./findMainApplicationPath')

function importApplicationPatch(natives) {
  var patch = ''

  for (native of natives) {
    patch += `
import ${native.packageName};`
  }
  return {
    path: findMainApplicationPath(),
    pattern: /import android.app.Application;/,
    patch,
    noExistNotice: `Couldn't find Android application entry point. Please see Doc`,
    alreadyAddedNotice: `"MainApplication.java" is already imported "import *.*"`,
  }
}

module.exports = importApplicationPatch
