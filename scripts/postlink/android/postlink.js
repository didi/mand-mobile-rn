var applyPatch = require('./applyPatch')

var rootBuildGradlePatch = require('./rootBuildGradlePatch')
var settingGradlePatch = require('./settingGradlePatch')
var appBuildGradlePatch = require('./appBuildGradlePatch')
var importApplicationPatch = require('./importApplicationPatch')
var packagePatch = require('./packagePatch')
var nativeModules = require('./natives')

module.exports = () => {
  console.info('Running android postlink script')
  if (!nativeModules || nativeModules.lenght == 0) {
    return Promise.reject()
  }

  return applyPatch(rootBuildGradlePatch())
    .then(() => applyPatch(settingGradlePatch(nativeModules)))
    .then(() => applyPatch(appBuildGradlePatch(nativeModules)))
    .then(() => applyPatch(importApplicationPatch(nativeModules)))
    .then(() => applyPatch(packagePatch(nativeModules)))
}
