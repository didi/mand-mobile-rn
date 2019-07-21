var glob = require('glob')
var fs = require('fs')

function findMainApplicationPath() {
  var ignoreFolders = { ignore: ['node_modules/**', '**/build/**', '**/src/debug/**'] }
  var manifestPath = glob.sync('**/AndroidManifest.xml', ignoreFolders)[0]

  if (!manifestPath) {
    return null
  }

  var manifest = fs.readFileSync(manifestPath, 'utf8')

  var matchResult = manifest.match(/application\s+android:name\s*=\s*"(.*?)"/)
  if (matchResult) {
    var appName = matchResult[1]
  } else {
    return null
  }

  var nameParts = appName.split('.')
  var searchPath = glob.sync(
    '**/' + nameParts[nameParts.length - 1] + '.java',
    ignoreFolders,
  )[0]
  return searchPath || glob.sync('**/MainApplication.java', ignoreFolders)[0]
}

module.exports = findMainApplicationPath
