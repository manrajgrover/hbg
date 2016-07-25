# hbg (Hacker Boilerplate Generator)
> CLI for generating boilerplate for coding competitions

## Usage

### Commands available

```
sudo hbg <command>

Commands:
  gen     Generate boilerplate
  add     Add default template
  config  Change config file

Options:
  -h, --help  Show help                                                [boolean]

```

### Command `gen`

```
Usage: hbg gen <options>

Options:
  -h, --help  Show help                                                [boolean]
  -l, --lang  Language. Change `config` for default
  -q, --ques  Number of questions. Change `config` for default

Examples:
  sudo hbg gen -l cpp -q 4

```

### Command `add`

```
Usage: hbg add <options>

Options:
  -h, --help      Show help                                            [boolean]
  -t, --template  Path to the template file                           [required]
  -l, --lang      Language chosen                                     [required]

Examples:
  sudo hbg add -t test/template.cpp -l cpp

```

### Command `config`

```
Usage: hbg config

Options:
  -h, --help  Show help                                                [boolean]
  -l, --list  List language and their extension                        [boolean]

Examples:
  sudo hbg config -l

```
