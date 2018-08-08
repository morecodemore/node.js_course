//color letter
let colors = require('colors');
let text = 'Hello student from Loftschool!';
console.log(text.rainbow);

console.log("");
console.log("");

//read files function
let fs = require('fs'),
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

//игра "Угадай число"
var readline = require('readline'),
    argv = require('minimist')(process.argv.slice(2)),
    mind, count, rl, logfile;
function init() {
    // получим случайное число от 1 до 10
    mind = Math.floor(Math.random() * 10) + 1;
    // обнулим счетчик количества угадываний
    count = 0;
    // установим ввод и вывод в стандартные потоки
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    // запомним имя файла для логов, если он есть
    logfile = argv['_'][0];
}
function game() {
    function log(data) {
        if (logfile != undefined)
            fs.appendFile(logfile, data + "\n");
    }
    function valid(value) {
        if (isNaN(value)) {
            console.log('Введите число!');
            return false;
        }
        if (value < 1 || value > 10) {
            console.log('Число должно лежать в заданном диапазоне!');
            return false;
        }
        return true;
    }
    rl.question('Введите любое число от 1 до 10, чтобы угадать задуманное: ',
        function (value) {
            var a = +value;
            if (!valid(a)) {
                // если валидацию не прошли - запускаем игру заново
                game();
            } else {
                count += 1;
                if (a === mind) {
                    console.log('Поздравляем! Вы угадали число за %d шага(ов)', count);
                    log('Поздравляем! Вы угадали число за ' + count + 'шага(ов)');
                    // угадали и закрыли экземпляр Interface, конец программы
                    rl.close();
                } else {
                    console.log('Вы не угадали, еще попытка');
                    game();
                }
            }
        });
}
init();
game();

//пример пост запроса
var request = require('request');
request({
    method: 'POST',
    uri: 'http://loftschool.com/',
    form: {
        key: 'value'
    },
}, function (err, res, body) {
    if (err) {
        console.error(err);
    } else {
        console.log(body);
        console.log(res.statusCode);
    }
});