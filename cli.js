#!/usr/bin/env node

/*
* @Author: Manraj Singh
* @Date:   2016-07-10 20:00:15
* @Last Modified by:   Manraj Singh
* @Last Modified time: 2016-07-14 20:11:21
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
    var argv = yargs
      .usage('Usage: $0 gen <options>')
      .demand(['q'])
      .alias('p', 'path').describe('p', 'Path where to be created')
      .alias('l', 'language').describe('l', 'Language. Change `config` for default')
      .alias('q', 'questions').describe('q', 'Number of questions')
      .example('$0')
      .argv;
  })
  .command('config', 'Change config file', (yargs) => {
  	
  })
  .help('h')
  .alias('h', 'help')
  .argv;