//copy the $file to $dir2
var copyFile = (file, dir2, callback) => {
  //include the fs, path modules
  var fs = require('fs');
  var path = require('path');

  //gets file name and adds it to dir2
  var f = path.basename(file);
  var source = fs.createReadStream(file);
  var dest = fs.createWriteStream(path.resolve(dir2, f));

  source.pipe(dest);
  source.on('end', function () { callback(null) });
  source.on('error', function (err) { callback(err) });
};


var CopyReadme = () => {
  var fs = require('fs');
  var path = require('path');

  var stories = path.resolve('..', 'samples', 'storybook', 'stories');
  var components = path.resolve('..', 'src', 'components');

  fs.readdir(components, (err, files) => {
    if (files && files.length > 0) {
      files.forEach((dir) => {
        var story = path.resolve(components, dir)
        if (fs.lstatSync(story).isDirectory()) {
          var from = path.resolve(components, dir, 'README.md')
          var to = path.resolve(stories, dir)
          if (fs.existsSync(from) && fs.lstatSync(from).isFile() && fs.existsSync(to) && fs.lstatSync(to).isDirectory()) {
            copyFile(from, to, (err) => {
              if (err) {
                // console.log('Failed:', to, err);
                return;
              }
              // console.log('Succesed:', to);
            });
          } else {
            // console.log('Failed:', to);
          }
        }
      })
    }
  })
}

CopyReadme()