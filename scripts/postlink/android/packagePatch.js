var findMainApplicationPath = require('./findMainApplicationPath')

function packagePatch(natives) {
  var patch = ''

  for (native of natives) {
    var split = native.packageName.split('.')
    patch += `,
          new ${split[split.length - 1]}()`
  }
  return {
    path: findMainApplicationPath(),
    pattern: /new MainReactPackage\(\)/,
    patch,
    noExistNotice: `Couldn't find Android application entry point. Please see Doc`,
    alreadyAddedNotice: `"MainApplication.java" is already added "new XxxxPackage()"`,
  }
}

module.exports = packagePatch
