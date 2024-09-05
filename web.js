const fs = require('fs');
const prompt = require('prompt');
const login = require('fca-unofficial');
const chalk = require('chalk');

prompt.message = '';

console.log(chalk.bold.hex("#00FF00").bold(" "));
console.log(chalk.bold.hex("#00FF00").bold(" "));
console.log(chalk.bold.hex("#00FF00").bold("\033[1;36m----------------------------------------------------------------\n"));

prompt.start();

console.log(chalk.bold.hex("#00FF00").bold(" "));

prompt.get(['datafile', 'targetID', 'timer', 'kidxnam3', 'notepadFile'], function (err, result) {
  if (err) { return onErr(err); }
  console.log(chalk.bold.hex("#00FF00").bold(" "));
  console.log(chalk.bold.hex("#00FF00").bold(" "));

  const appState = JSON.parse(fs.readFileSync(result.datafile, 'utf8'));
  const messages = fs.readFileSync(result.notepadFile, 'utf8').split('\n');
  let currentIndex = 0;
  
  login({ appState }, (err, api) => {
    if (err) return console.error(err);

    setInterval(() => {
      const message = messages[currentIndex].trim();
      const messageWithWord = `${result.kidxnam3} ${message}`;

      api.sendMessage(messageWithWord, result.targetID, () => {
        const now = new Date();
        console.log(chalk.bold.hex("#00FF00").bold(" "));
        console.log(chalk.bold.hex("#00FF00").bold(" "));
        const formattedTime = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true });
        console.log(chalk.bold.hex('#00FF00').bold(`--> Your Convo/Inbox Link  :-- ${result.targetID}`));
        console.log(chalk.bold.hex('#00FF00').bold(`--> L3G3ND H3R0S H3R3 :D || Date & Time ::- ${formattedTime}`));
        console.log(chalk.bold.hex('#00FF00').bold(`--> Message Successfully Sent By Amar Rajput :D ::-->> ${result.kidxnam3} ${message}\n`));
        currentIndex = (currentIndex + 1) % messages.length;
      });

    }, `${result.timer}000`);
  });
});

function onErr(err) {
  console.log(err);
  return 1;
}

process.on('unhandledRejection', (err, p) => {});
