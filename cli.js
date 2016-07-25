#!/usr/bin/env node

/*
* @Author: Manraj Singh
* @Date:   2016-07-10 20:00:15
* @Last Modified by:   Manraj Singh
* @Last Modified time: 2016-07-25 11:10:44
*/

'use strict';

const yargs = require('yargs');
const fs = require('fs');
const ora = require('ora');
const chalk = require('chalk');
const config = require('./config');
const path = require('path');
const Table = require('cli-table');
const template = require('./template');
const languages = require('./languages');

const LANG_ERR = 'Not a valid languege. Please run `hbg config -l` to get the list of languages.';

/**
 * Returns full path of file
 */
const getPath = (folderPath, name) => {
  return path.resolve(folderPath, name);
}

/**
 * Returns file extension of param
 * @param  {string} lang [Language name]
 * @return {string}      [Extension of param language]
 */
const getExtension = (lang) => {
  return languages[lang];
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
  let files = [ques.toString() +'.'+ getExtension(lang), 'input.txt', 'output.txt'];
  fs.mkdirSync(folderPath);
  for(let i = 0; i<files.length; i++) {
    fs.writeFileSync(getPath(folderPath, files[i]), '', 'utf8');
  }
}

const argv = yargs
  .usage('sudo $0 <command>')
  .command('gen', 'Generate boilerplate', (yargs) => {
    const argv = yargs
      .usage('Usage: $0 gen <options>')
      .demand(['q'])
      .alias('l', 'lang').describe('l', 'Language. Change `config` for default')
      .alias('q', 'ques').describe('q', 'Number of questions')
      .example('sudo $0 gen -l cpp -q 4') // To-do
      .argv;
    let { q } = argv;
    let lang = (argv.l == undefined ? config['lang'] : argv.l).toLowerCase();
    if(validLang(lang)){
      for(let i = 1; i <= q; i++) {
        let folderPath = getPath(process.cwd(), i.toString());
        generate(folderPath, i, lang);
      }
    }
    else{
      console.log(chalk.red(LANG_ERR));
    }
  })
  .command('add', 'Add default template', (yargs) => {
    const argv = yargs
      .usage('Usage: $0 add <options>')
      .demand(['t', 'l'])
      .alias('t', 'template').describe('t', 'Path to the template file')
      .alias('l', 'lang').describe('l', 'Language')
      .example('$0 add -t test/template.cpp -l cpp') // To-do
      .argv;
    let { t } = argv;
    let lang = (argv.l == undefined ? config['lang'] : argv.l).toLowerCase();
    if(validLang(lang)) {
      let obj = template;
      let data = fs.readFileSync(getPath(process.cwd(), t), 'utf8');
      obj[lang] = data;
      fs.writeFileSync(getPath(__dirname, 'template.json'), JSON.stringify(obj, null, 2), 'utf8');
    }
    else{
      console.log(chalk.red(LANG_ERR));
    }
  })
  .command('config', 'Change config file', (yargs) => {
    const argv = yargs
      .usage('Usage: $0 config')
      .alias('l', 'list').describe('l', 'List language and their code').boolean('l')
      .example('$0') // To-do
      .argv;

    if (argv.list){
      const spinner = ora('Getting languages').start();
      let table = new Table({
        head: ['Language', 'File Extension'],
        colWidths: [20, 20]
      });
      for(let name in languages){
        table.push([name, languages[name]]);
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
        name: 'questions',
        message: 'Enter default number of questions <Leave blank in case unchanged>'
      }];
      inquirer.prompt(questions).then((answers) => {

      });
    }
  })
  .help('h')
  .alias('h', 'help')
  .argv;
