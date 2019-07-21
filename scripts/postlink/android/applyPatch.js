var fs = require('fs')

function applyPatch(patch) {
  if (!fs.existsSync(patch.path)) {
    return Promise.reject(patch.noExistNotice)
  }
  var content = fs.readFileSync(patch.path, 'utf-8')

  console.info(`Writing ${patch.path}`)

  if (~content.indexOf(patch.patch)) {
    console.info(patch.alreadyAddedNotice)
  } else {
    fs.writeFileSync(
      patch.path,
      content.replace(patch.pattern, (match) => `${match}${patch.patch}`),
    )
  }
  return Promise.resolve()
}

module.exports = applyPatch
