//color letter
let colors = require('colors');
let text = 'Hello student from Loftschool!';
console.log(text.rainbow);

console.log("");
console.log("");

//read files function
var fs = require('fs'),
    path = require('path'),
    dir = process.cwd(),
    files = fs.readdirSync(dir);
console.log('Name \t Size \t Date \n');
files.forEach(function (filename) {
    var fullname = path.join(dir, filename),
        stats = fs.statSync(fullname);
    if (stats.isDirectory()) {
        console.log(filename + '\t DIR \t' + stats.mtime + '\n');
    } else {
        console.log(filename + '\t' + stats.size + '\t' + stats.
            mtime + '\n');
    }
});