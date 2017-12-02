# hbg (Hacker Boilerplate Generator)
[![Build Status](https://travis-ci.org/ManrajGrover/hbg.svg?branch=master)](https://travis-ci.org/ManrajGrover/hbg) [![Build status](https://ci.appveyor.com/api/projects/status/7vklh6s6wglvwgfk?svg=true)](https://ci.appveyor.com/project/ManrajGrover/hbg) [![npm version](https://badge.fury.io/js/hbg.svg)](https://www.npmjs.com/package/hbg) [![npm](https://img.shields.io/npm/dt/hbg.svg?maxAge=2592000)](https://www.npmjs.com/package/hbg) ![awesome](https://img.shields.io/badge/awesome-yes-green.svg)
> CLI for generating boilerplate for coding competitions

## Install

```sh
$ npm install -g hbg
```

## Usage

### Commands available

```sh
sudo hbg <command>

Commands:
  gen     Generate boilerplate
  add     Add default template
  config  Change config file

Options:
  -h, --help  Show help                                         [boolean]

```

### Command `gen`

```sh
Usage: hbg gen <options>

Options:
  -h, --help  Show help                                         [boolean]
  -l, --lang  Language. Change `config` for default
  -q, --ques  Number of questions. Change `config` for default

Examples:
  $ sudo hbg gen -l cpp -q 4

```

### Command `add`

```sh
Usage: hbg add <options>

Options:
  -h, --help      Show help                                     [boolean]
  -t, --template  Path to the template file                    [required]
  -l, --lang      Language chosen                              [required]

Examples:
  $ sudo hbg add -t test/template.cpp -l cpp

```

### Command `config`
Run `$ sudo hbg config` to change configuration of your installation. This includes default language and default questions.

```sh
Usage: hbg config

Options:
  -h, --help  Show help                                        [boolean]
  -l, --list  List language and their extension                [boolean]

Examples:
  $ sudo hbg config -l

```

## License
[MIT](https://github.com/ManrajGrover/hbg/blob/master/LICENSE) © [Manraj Singh](https://github.com/ManrajGrover)
