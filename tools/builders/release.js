// move all files from dist/apps/prerender to dist/apps using nodejs and remove the source folder
let fs = require('fs');
let path = require('path');
let root = path.join(__dirname, '..', '..');
let source = path.join(root, 'dist', 'apps', 'prerender');
let destination = path.join(root, 'dist', 'apps');
let files = fs.readdirSync(source);
files.forEach(function (file) {
  let curSource = path.join(source, file);
  let curDestination = path.join(destination, file);
  // if exists, delete
  if (fs.existsSync(curDestination)) {
    // if directory, delete recursively
    if (fs.lstatSync(curDestination).isDirectory()) {
      fs.rmdirSync(curDestination, { recursive: true });
    } else {
      fs.unlinkSync(curDestination);
    }
  }
  fs.renameSync(curSource, curDestination);
});
fs.rmdirSync(source, { recursive: true });

// zip all files in dist/apps and save to prod-server.zip
let archiver = require('archiver');
let output = fs.createWriteStream(path.join(root, 'prod-server.zip'));
let archive = archiver('zip', { zlib: { level: 9 } });
output.on('close', () => console.log((archive.pointer() / 1024).toFixed(2) + ' KB'));
archive.on('error', (err) => {
  throw err;
});
archive.pipe(output);
archive.directory(destination, false);
archive.finalize().then(() => console.log('done archiving'));
