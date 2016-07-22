#!/usr/bin/env node

/*
* @Author: Manraj Singh
* @Date:   2016-07-10 20:00:15
* @Last Modified by:   Manraj Singh
* @Last Modified time: 2016-07-22 22:12:55
*/

'use strict';

const yargs = require('yargs');
const fs = require('fs');
const ora = require('ora');
const chalk = require('chalk');
const config = require('./config');

const argv = yargs
  .usage('$0 <command>')
  .command('gen', 'Generate boilerplate', (yargs) => {
    const argv = yargs
      .usage('Usage: $0 gen <options>')
      .demand(['q'])
      .alias('p', 'path').describe('p', 'Path where to be created')
      .alias('l', 'language').describe('l', 'Language. Change `config` for default')
      .alias('q', 'questions').describe('q', 'Number of questions')
      .example('sudo $0 gen') // To-do
      .argv;
    let { p, l, q } = argv;

  })
  .command('config', 'Change config file', (yargs) => {
  	const argv = yargs
      .usage('Usage: $0 config <options>')
      .example('$0') // To-do
      .argv;
    const questions = [{
        type: 'input',
        name: 'path',
        message: 'Enter default path <leave blank incase unchanged>'
      } , {
        type: 'input',
        name: 'default_lang',
        message: 'Enter default language code <leave blank incase unchanged>'
      } , {
        type: 'input',
        name: 'questions',
        message: 'Enter default number of questions <leave blank incase unchanged>'
    }];
    inquirer.prompt(questions).then((answers) => {
      
    });
  })
  .help('h')
  .alias('h', 'help')
  .argv;
