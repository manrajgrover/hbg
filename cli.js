#!/usr/bin/env node

/*
* @Author: Manraj Singh
* @Date:   2016-07-10 20:00:15
* @Last Modified by:   Manraj Singh
* @Last Modified time: 2016-07-23 19:37:15
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

/**
 * Returns file extension of param
 * @param  {string} lang [Language name]
 * @return {string}      [Extension of param language]
 */
const getExtension = (lang) => {
  return '';
}

const generate = (folderPath, question, lang) => {
  let files = [question.toString() + getExtension(lang), 'input.txt', 'output.txt'];
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
      .alias('l', 'language').describe('l', 'Language. Change `config` for default')
      .alias('q', 'questions').describe('q', 'Number of questions')
      .example('sudo $0 gen') // To-do
      .argv;
    let { l, q } = argv;
    for(let i = 1; i <= q; i++) {
      let folderPath = getPath(process.cwd(), i.toString());
      generate(folderPath, i, l);
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
