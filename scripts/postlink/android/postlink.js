var applyPatch = require('./applyPatch')

var rootBuildGradlePatch = require('./rootBuildGradlePatch')
var settingGradlePatch = require('./settingGradlePatch')
var appBuildGradlePatch = require('./appBuildGradlePatch')
var importApplicationPatch = require('./importApplicationPatch')
var packagePatch = require('./packagePatch')
var nativeModules = require('./natives')
var path = require('path')
var fs = require('fs')

module.exports = () => {
  console.info('Running android postlink script')
  if (!nativeModules || nativeModules.lenght == 0) {
    return Promise.reject()
  }
  // node_modules/@didi/mand-mobile-rn/
  // or
  // node_modules/mand-mobile-rn/
  var mandMobilPath = path.join('.', 'node_modules', '@didi', 'mand-mobile-rn')
  if (!fs.existsSync(mandMobilPath)) {
    mandMobilPath = path.join('.', 'node_modules', 'mand-mobile-rn')
  }
  return applyPatch(rootBuildGradlePatch())
    .then(() => applyPatch(settingGradlePatch(mandMobilPath, nativeModules)))
    .then(() => applyPatch(appBuildGradlePatch(nativeModules)))
    .then(() => applyPatch(importApplicationPatch(nativeModules)))
    .then(() => applyPatch(packagePatch(nativeModules)))
}
