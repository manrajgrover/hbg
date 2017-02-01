#!/usr/bin/env node

const yargs = require('yargs');
const inquirer = require('inquirer');
const fs = require('fs');
const ora = require('ora');
const chalk = require('chalk');
const config = require('./config');
const path = require('path');
const Table = require('cli-table');
const template = require('./template');
const languages = require('./languages');

const { LANG_ERR, QUES_ERR, TASK_COMPL } = require('./constants');

/**
 * Returns full path of file
 */
const getPath = (folderPath, name) => path.resolve(folderPath, name);

/**
 * Generates boiler plate
 */
const generate = (folderPath, ques, lang) => {
  const files = [`${ques}.${languages[lang]}`, 'input.txt', 'output.txt'];
  const data = [template[lang] ? '' : template[lang], '', ''];
  fs.mkdirSync(folderPath);
  for (let i = 0; i < files.length; i += 1) {
    fs.writeFileSync(getPath(folderPath, files[i]), data[i], 'utf8');
  }
};

const argv = yargs
  .usage('sudo hbg <command>')
  .command('gen', 'Generate boilerplate', (yargs) => {
    const argv = yargs
      .usage('Usage: hbg gen <options>')
      .alias('l', 'lang')
        .describe('l', 'Language. Change `config` for default')
      .alias('q', 'ques')
        .describe('q', 'Number of questions. Change `config` for default')
      .example('$ sudo hbg gen -l cpp -q 4')
      .argv;
    const spinner = ora('Generating Boilerplate').start();
    let lang = (argv.l ? config.default_lang : argv.l);
    if (lang !== undefined) {
      lang = lang.toLowerCase();
    }

    const ques = (argv.ques ? argv.ques : config.default_ques);
    if (languages[lang] && ques !== undefined) {
      for (let i = 1; i <= ques; i += 1) {
        const folderPath = getPath(process.cwd(), i.toString());
        generate(folderPath, i, lang);
      }
      spinner.stop();
      console.log(chalk.green(TASK_COMPL));
    } else {
      spinner.stop();
      if (!languages[lang]) {
        console.log(chalk.red(LANG_ERR));
      } else {
        console.log(chalk.red(QUES_ERR));
      }
    }
  })
  .command('add', 'Add default template', (yargs) => {
    const argv = yargs
      .usage('Usage: hbg add <options>')
      .demand(['t', 'l'])
      .alias('t', 'template')
        .describe('t', 'Path to the template file')
      .alias('l', 'lang')
        .describe('l', 'Language chosen')
      .example('$ sudo hbg add -t test/template.cpp -l cpp')
      .argv;
    const spinner = ora('Adding template').start();
    const lang = (argv.l ? argv.l : config.lang).toLowerCase();
    if (languages[lang]) {
      const obj = template;
      const data = fs.readFileSync(getPath(process.cwd(), argv.t), 'utf8');
      obj[lang] = data;
      fs.writeFileSync(getPath(__dirname, 'template.json'), JSON.stringify(obj, null, 2), 'utf8');
      spinner.stop();
      console.log(chalk.green(TASK_COMPL));
    } else {
      spinner.stop();
      console.log(chalk.red(LANG_ERR));
    }
  })
  .command('config', 'Change config file', (yargs) => {
    const argv = yargs
      .usage('Usage: sudo hbg config')
      .alias('l', 'list').describe('l', 'List language and their extension').boolean('l')
      .example('$ sudo hbg config -l')
      .argv;

    if (argv.list) {
      const spinner = ora('Getting languages').start();
      let table = new Table({
        head: ['Language', 'File Extension'],
        colWidths: [20, 20],
      });
      for (let name in languages) {
        table.push([chalk.cyan(name), chalk.green(languages[name])]);
      }
      spinner.stop();
      console.log(table.toString());
    } else {
      const questions = [{
        type: 'input',
        name: 'default_lang',
        message: 'Enter default language code <Leave blank in case unchanged>',
      }, {
        type: 'input',
        name: 'default_ques',
        message: 'Enter default number of questions <Leave blank in case unchanged>',
      }];
      inquirer.prompt(questions).then((answers) => {
        const spinner = ora('Saving').start();
        let obj = config;
        if (answers.default_lang !== '') {
          obj.default_lang = answers.default_lang;
        }
        if (answers.default_ques !== '') {
          obj.default_ques = answers.default_ques;
        }
        fs.writeFileSync(getPath(__dirname, 'config.json'), JSON.stringify(obj, null, 2), 'utf8');
        spinner.stop();
        console.log(chalk.green(TASK_COMPL));
      });
    }
  })
  .help('h')
  .alias('h', 'help')
  .argv;
