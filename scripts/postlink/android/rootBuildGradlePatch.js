var path = require('path')
// 写入jetpack maven 依赖，因为ImagePicker 使用了发布在 jitpack 的 PhotoView 等
function rootBuildGradlePatch() {
  return {
    path: path.join('android', 'build.gradle'),
    pattern: /allprojects\s*\{\n*\s*repositories\s*\{/,
    patch: `
        maven { url 'https://jitpack.io' }`,
    noExistNotice: `Couldn't find root "build.gradle" file. Please see Doc`,
    alreadyAddedNotice: `Root "build.gradle" is already added`,
  }
}

module.exports = rootBuildGradlePatch
