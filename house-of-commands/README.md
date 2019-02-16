# House of Commands

Useful development shortcuts and commands I use on daily basis.

## Keyboard Shortcuts

1. Window Management 
    - **close one window, or tab.**: `command + w`
    - **close all windows**: `command + q`
    - **close all tabs**: `command + shift + w`
    - **new tab**: `command + t`
    - **switch between tabs. Not every app supports this.**: `command + Shift + [ & ] `
2. Text Management 
    - **jump between words.**: `alt + Left / right`
    - **jump to the ends of the line.**: `command + left / right` 
    - **delete all the words till it hits the left edge.**: `command + delete`
3. Operating System
    - **spotlight search, then up / down and enter to select.**: `command + space`
    - **application selector**: `command + tab`
4. Cursor Movement
    - **move cursor to end of the line**: `ctrl + E`
    - **move cursor to start of the line**: `ctrl + A`
    - **move cursor one character forward**: `ctrl + F`
    - **move cursor one character backward**: `ctrl + B`
    - **move cursor one word forward**: `alt + F / alt + right`
    - **move cursor one word backward**: `alt + B / alt + left`
    - **,mve cursor to clicked character**: `Alt + click`
    - **toggle between the start of line and cursor position**: `ctrl + XX	`
5. Process
    - **kills current task (SIGINT)**: `ctrl + C`
    - **inserts an EOF**: `ctrl + D`
    - **pauses current task**: `ctrl + Z`
    - **stop output to the screen (for long running verbose commands))**: `ctrl + S`
    - **allow output to the screen (if previously stopped using stop output command)**: `ctrl + Q`
6. History
    - **previous command**: `ctrl + P`
    - **next command**: `ctrl + R`

## Shell Command Line

- **find path and package**: `which [package name] git`
- **cursor at the beginning of the line**: `control + A`
- **cursor at the end of the line**: `control + E`
- **clear line**: `control + U`
- **in the middle of a line**: `option + click mouse pointer`
- **echo**: `echo "string"`
- **manual instructions of commands**: `man grep` [command name]
- **exit to close the terminal**: `exit`
- **to kill files**: `kill -9 $(pgrep filename)`
- **to add permission**: `chmod +x filename`
- **to find files with an extension**: `find path -name “*.filetype”`
- **to copy**: `cp path1/filename path2/filename`
- **file permission**: `chmod g+x/w/or/r filename`
- **file ownership**: `chown username filename`
- **show disk space**: `df-h (human readable)`
- **CPU, RAM, etc**: `top`
- **search and print**: `grep (can add layers of logic)`
- **find and Replace**: `sed s/word/word/g`
- **file Content Print**: `cat`
- **multiple commands in the same line**: `-`
- **execute a file with its name, need to set up the environment**: `(# !/usr/bin/env python) ./filename`
- **delete content in the file**: `cat /dev/null > filename`
- **back to the previous path**: `cd -`
- **copy b/w different hosts allows files to be copied to, from, or between different hosts. It uses ssh for data transfer and provides the same authentication and same level of security as ssh.**: `scp`
- **help (stands for manual)**: `man`
- **symbolic Link**: `ln -sf source-path destination-path`
- **more content of a file**: `| more`
- **list information about all the files**:`ll`
- **create folder with sub folders**: `mkdir -p folder-name/{sub-folder1, sub-folder2}`
- **list differences b/w two files**: `diff file-name file-name`
- **unzip Github folder (master)**: `tar xvf master -C yourFolder --strip-components 1 or tar -xvzf “name”`
- **find size file in MB or KB**: `ls -l --block-size=M or ls-lh`
- **find file path based on filename**: `find ./path -name “filename.*”`
- **find string in directory with file name**: `grep -r --include=*.{cpp,h} “hello” .`
- **find package if it is installed**: `dpkg -s apache-perl`
- **find content of the link**: `curl -sS “link”`
- **conditional search and print**:
    `
    $ tail -n 3 calc_process.log | grep final | tr '{' '\n' | grep startdate
    $ tail -n 3 calc_process.log | grep final | tr '{' '\n' | grep startdate | sed -e 's/}.*$//g'
    `

## VIM

- **to find text in VIM**: `/ or ? text`
- **go to bottom**: `Shift +G`
- **go to top**: `gg or Shift + gg`
- **line numbers**: `:set nu`
- **helper & setter**: `:help and :set`
- **delete**: `d`
- **delete word**: `dw`
- **delete a character**: `x`
- **arrows**: `h, j, k, l`
- **append at the end of the line**: `a`
- **shift to the end of the line**: `A`
- **find and replace all**: `:%s/foo/bar/g`
- **delete all**: `go on top of line gg and to delete all- dG`

## GREP

1. Search the contents of files using grep:
    - **find version of a file**: `command name, version, filename: grep version package.json`
    - **find keyword search**: `command name, keyword, filename: grep react package.json`
    - **find keyword in more than 1 file**: `command name, keyword, filename: grep “#” README.md codestyle.md xyz.md`
    - **find by keyword in all files ending with file type**: `command name, keyword, *.fileextension: grep “#” *.md`
2. Search directory contents recursively using grep:
    - **search recursively in folder root**: `commandname, -r, keyword, path: grep -r react ./`
    - **search recursively in folder path (relative to your current path not the actual)**: `grep -r react public/components/App.js`
3. Use find to search for filename patterns (grep vs find):
    - **search filename patterns**: `command name, path, -name, “*fileextension”: find . -name, “*jsx”`
4. Search Matching files by combining find and grep with xargs:
    - **pipe find into grep**: `find examples -name “*Spec.js” | barges grep “module”`
    - **same as above but just grep**: `grep -r —include=“Spec.js” “should” examples/`
5. Search the contents of a git repository with git grep:
    - **find in git that is being tracked in version control**: `git grep bind (query string); results are highlighted in red`
    - **color keyword query**: `grep -r —color bind ./`
6. Show context around matches using grep:
    - **line number**: `grep -n “#” *.md`
    - **after**: `grep -A 2 —color “#” *.md`
    - **before**: `grep -A 2 —color “#” *.md`
    - **context (before + after)**: `grep -C 2 —color “#” *.md`
7. Search for basic patterns using grep:
    - **everything that matches after the string like http**: `grep —color “http.” readme.md`
    - **special Character like dot, use backslash**: `grep —color “\.com” readme.md`
    - **all characters b/w special characters like ()**: `grep —color ”(.*)” readme.md`
8. Using grep’s extended regular expressions to find complex patterns:
    - **conditional Search for character 0 or 1 time (?)**: `grep —color “https\?” readme.md`
    - **atleast 1 or more occurances (+)**: `grep —color “https\+” readme.md`
    - **atlas 0 or more occurances (*)**: `grep -color “https*” readme.md`
    - **escape for special characters**: `grep -E or backslash (\)`
9. Search for optional patterns with grep OR:
    - **color check**: `echo “is it grey or gray?” | grep —color “grey\|gray” or echo “is it grey or gray?” | grep —color -E “grey|gray”`
    - **spell check in your codebase (-rE recursive&Escape)**: `grep —color -rE “grey|gray” examples/`
10. Specify line beginning and end in patterns using grep:
    - **anchor for beginning of the line**: `grep —color “^#” app-spec.md`
    - **anchor for ending of the line**: `grep —color “,$” app-spec.md`
    - **complex anchor with wildcard phrase**: `grep —color -r “^import .* from” examples/`
11. Match classes of characters using bracket expressions with grep:
    - **match a or b**: `echo abc123 | grep —color “[ab]”`
    - **range**: `echo abc123 | grep —color “[a-z]”`
    - **range**: `echo abc123 | grep —color “[1-9]”`
    - **match word with some pattern (matches designer and developer)**: `grep —color “de[a-z]*er” readme.md`
    - **same as above but don’t have to explicit define the character range (matches developer&designer)**: `grep —color “de[[:alpha:]]*er” readme.md`
    - **sase insesitive match on only 1 character**: `find . -name “*js” | grep —color “[sS]pec”`
12. Search with groups using grep:
    - **single quote after the grey or gray**: `grep -rE —color “(grey|gray)\’” .`
    - **single or double quote**: `grep -rE —color “(grey|gray)(\’|\”)” .`
    1. Find matches excluding a pattern with grep:
    - **inverse search (stuff that does’t match)**: `find examples/angularjs -name “*js” | grep -v “node modules”`
    - **inverse Search combo**: `find examples -name “*js” | grep -vE “node_modules|Spec”`

## GIT

- **resetting git**: `git reset --hard HEAD`
- **pull to original settings**: `git pull - - rebase`

## NPM scripts

- **omit npm config**: `npm init -y`
- **alias shortcut**: `npm install —save alias: npm i -S`
- **dev shortcut**: `npm —save-dev: npm i -D`

## Folder Structure

- **executable files**:`bin` 
- **3rd party libraries**: `lib` 
- **env/configuration files**: `etc` 
- **log files**: `log` 
- **source code**: `src` 
- **shared files**: `shared` 
- **client source code**: `client` 
- **server source code**: `server` 
