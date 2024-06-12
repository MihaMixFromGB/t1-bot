import * as readline from "node:readline";
import bot from "./index.js";

var log = console.log;

log("Для выход нажмите CTRL+C или введите 'выйти'");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var recursiveAsyncReadLine = function () {
  rl.question("> ", async function (request) {
    if (request == "выйти") return rl.close();
    log(">", await bot.request(request));
    recursiveAsyncReadLine();
  });
};

recursiveAsyncReadLine();
