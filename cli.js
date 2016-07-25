#!/usr/bin/env node

/*
* @Author: Manraj Singh
* @Date:   2016-07-10 20:00:15
* @Last Modified by:   Manraj Singh
* @Last Modified time: 2016-07-25 13:44:26
*/

'use strict';

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

const LANG_ERR = 'Not a valid language. Please run `hbg config -l` to get the list of languages.';
const QUES_ERR = 'Not a valid question number. Please enter a number.';
const TASK_COMPL = 'Task completed. Support project at https://github.com/ManrajGrover/hbg.'

/**
 * Returns full path of file
 */
const getPath = (folderPath, name) => {
  return path.resolve(folderPath, name);
}

/**
 * Returns if language is valid or not
 */
const validLang = (lang) => {
  return languages[lang] == undefined ? false : true;
}

/**
 * Generates boiler plate 
 */
const generate = (folderPath, ques, lang) => {
  let files = [ques.toString() +'.'+ languages[lang], 'input.txt', 'output.txt'];
  let data = [template[lang] != undefined ? template[lang] : '', '', ''];
  fs.mkdirSync(folderPath);
  for(let i = 0; i<files.length; i++) {
    fs.writeFileSync(getPath(folderPath, files[i]), data[i], 'utf8');
  }
}

const argv = yargs
  .usage('sudo $0 <command>')
  .command('gen', 'Generate boilerplate', (yargs) => {
    const argv = yargs
      .usage('Usage: $0 gen <options>')
      .alias('l', 'lang').describe('l', 'Language. Change `config` for default')
      .alias('q', 'ques').describe('q', 'Number of questions. Change `config` for default')
      .example('$ sudo $0 gen -l cpp -q 4')
      .argv;
    const spinner = ora('Generating Boilerplate').start();
    let lang = (argv.l == undefined ? config['default_lang'] : argv.l);
    if(lang != undefined){
      lang = lang.toLowerCase();
    }
    let ques = (argv.ques == undefined ? config['default_ques'] : argv.ques);
    if(validLang(lang) && ques !== undefined){
      for(let i = 1; i <= ques; i++) {
        let folderPath = getPath(process.cwd(), i.toString());
        generate(folderPath, i, lang);
      }
      spinner.stop();
      console.log(chalk.green(TASK_COMPL));
    }
    else{
      spinner.stop();
      if(!validLang(lang)){
        console.log(chalk.red(LANG_ERR));
      }
      else{
        console.log(chalk.red(QUES_ERR));
      }
    }
  })
  .command('add', 'Add default template', (yargs) => {
    const argv = yargs
      .usage('Usage: $0 add <options>')
      .demand(['t', 'l'])
      .alias('t', 'template').describe('t', 'Path to the template file')
      .alias('l', 'lang').describe('l', 'Language chosen')
      .example('$ sudo $0 add -t test/template.cpp -l cpp')
      .argv;
    const spinner = ora('Adding template').start();
    let { t } = argv;
    let lang = (argv.l == undefined ? config['lang'] : argv.l).toLowerCase();
    if(validLang(lang)) {
      let obj = template;
      let data = fs.readFileSync(getPath(process.cwd(), t), 'utf8');
      obj[lang] = data;
      fs.writeFileSync(getPath(__dirname, 'template.json'), JSON.stringify(obj, null, 2), 'utf8');
      spinner.stop();
      console.log(chalk.green(TASK_COMPL));
    }
    else{
      spinner.stop();
      console.log(chalk.red(LANG_ERR));
    }
  })
  .command('config', 'Change config file', (yargs) => {
    const argv = yargs
      .usage('Usage: sudo $0 config')
      .alias('l', 'list').describe('l', 'List language and their extension').boolean('l')
      .example('$ sudo $0 config -l')
      .argv;

    if (argv.list){
      const spinner = ora('Getting languages').start();
      let table = new Table({
        head: ['Language', 'File Extension'],
        colWidths: [20, 20]
      });
      for(let name in languages){
        table.push([chalk.cyan(name), chalk.green(languages[name])]);
      }
      spinner.stop();
      console.log(table.toString());
    }
    else {
      const questions = [{
        type: 'input',
        name: 'default_lang',
        message: 'Enter default language code <Leave blank in case unchanged>'
      } , {
        type: 'input',
        name: 'default_ques',
        message: 'Enter default number of questions <Leave blank in case unchanged>'
      }];
      inquirer.prompt(questions).then((answers) => {
        const spinner = ora('Saving').start();
        var obj = config;
        if (answers.default_lang !== ''){
          obj.default_lang = answers.default_lang;
        }
        if (answers.default_ques !== ''){
          obj.default_ques = answers.default_ques;
        }
        fs.writeFileSync(__dirname+'/config.json', JSON.stringify(obj, null, 2), 'utf8');
        spinner.stop();
        console.log(chalk.green(TASK_COMPL));
      });
    }
  })
  .help('h')
  .alias('h', 'help')
  .argv;
