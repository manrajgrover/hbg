#!/usr/bin/env node

/*
* @Author: Manraj Singh
* @Date:   2016-07-10 20:00:15
* @Last Modified by:   Manraj Singh
* @Last Modified time: 2016-07-23 19:04:12
*/

'use strict';

const yargs = require('yargs');
const fs = require('fs');
const ora = require('ora');
const chalk = require('chalk');
const config = require('./config');
const path = require('path');

const getPath = (folderPath, name) => {
  return path.resolve(folderPath, name);
}

const getExtension = (lang) => {

}

const generate = (folderPath, question) => {
  let filePath = getPath(folderPath, question.toString());
  let inputPath = getPath(folderPath, 'input.txt');
  let outputPath = getPath(folderPath, 'output.txt');
  fs.mkdirSync(folderPath);
  fs.writeFileSync(i.toString());
}

const argv = yargs
  .usage('sudo $0 <command>')
  .command('gen', 'Generate boilerplate', (yargs) => {
    const argv = yargs
      .usage('Usage: $0 gen <options>')
      .demand(['q'])
      .alias('l', 'language').describe('l', 'Language. Change `config` for default')
      .alias('q', 'questions').describe('q', 'Number of questions')
      .example('sudo $0 gen') // To-do
      .argv;
    let { l, q } = argv;
    let ext = getExtension(l);
    for(let i = 1;i <= q; i++) {
      let folderPath = path.resolve(__dirname, i.toString());

    }
  })
  .command('config', 'Change config file', (yargs) => {
  	const argv = yargs
      .usage('Usage: $0 config <options>')
      .example('$0') // To-do
      .argv;
    const questions = [{
      type: 'input',
      name: 'default_lang',
      message: 'Enter default language code <leave blank incase unchanged>'
    } , {
      type: 'input',
      name: 'questions',
      message: 'Enter default number of questions <Leave blank incase unchanged>'
    }];
    inquirer.prompt(questions).then((answers) => {

    });
  })
  .help('h')
  .alias('h', 'help')
  .argv;
