# House of Commands

Useful development shortcuts and commands I use on daily basis. 

## Folder Structure
- **bin**: executable files
- **lib**: 3rd party libraries
- **etc**: envi/configuration files
- **log**: log files
- **src**: source code
- **shared**: shared files
- **client**: client source code
- **server**: server source code

## LINUX Commands:
- **To kill files**: ```kill -9 $(pgrep filename)```
- **To add permission**: ```chmod +x filename```
- **To find files with an extension**: ```find path -name “*.filetype”```
- **To copy**: ```cp path1/filename path2/filename```
- **File permission**: ```chmod g+x/w/or/r filename```
- **File ownership***: ```chown username filename```
- **Show disk space**: ```df-h (human readable)```
- **CPU, RAM, etc**: ```top```
- **Search and print**: ```grep (can add layers of logic)```
- **Find and Replace**: ```sed s/word/word/g```
- **File Content Print**: ```cat```
- **Multiple commands in the same line**: ```- ```
- **Execute a file with its name, need to set up the environment**: ```(# !/usr/bin/env python) ./filename ```
- **Delete content in the file**: ```cat /dev/null > filename```
- **Back to the previous path**: ```cd -```
- **Conditional search and print**:
```
$ tail -n 3 calc_process.log | grep final | tr '{' '\n' | grep startdate
$ tail -n 3 calc_process.log | grep final | tr '{' '\n' | grep startdate | sed -e 's/}.*$//g'
```
- **Copy b/w different hosts allows files to be copied to, from, or between different hosts. It uses ssh for data transfer and provides the same authentication and same level of security as ssh.**: ```scp```
- **Help (stands for manual)**: ```man```
- **Symbolic Link**: ```ln -sf source-path destination-path```
- **More content of a file**: ``` | more```
- **List information about all the files**:``` ll ```
- **Create folder with sub folders**: ```mkdir -p folder-name/{sub-folder1, sub-folder2}```
- **List differences b/w two files**: ```diff file-name file-name```
- **Unzip Github folder (master)**: ```tar xvf master -C yourFolder --strip-components 1 or tar -xvzf “name”```
- **Find size file in MB or KB**: ```ls -l --block-size=M or ls-lh```
- **Find file path based on filename**: ```find ./path -name “filename.*”```
- **Find string in directory with file name**: ```grep -r --include=*.{cpp,h} “hello” .```
- **Find package if it is installed**: ```dpkg -s apache-perl```
- **Find content of the link**: ```curl -sS “link”```

## VIM Commands:
- **To find text in VIM**: ```/ or ? text```
- **Go to bottom**: ```Shift +G```
- **Go to top**: ```gg or Shift + gg```
- **Line numbers**: ```:set nu```
- **Helper & Setter**: ```:help and :set```
- **delete**: ```d```
- **delete word**: ```dw```
- **delete a character**: ```x```
- **arrows**: ```h, j, k, l```
- **append at the end of the line**: ```a```
- **shift to the end of the line**: ```A```
- **Find and Replace All**: ```:%s/foo/bar/g```
- **Delete all**: ```go on top of line gg and to delete all- dG```

## GREP Commands:
1. Search the contents of files using grep:

- **Find version of a file**: ```command name, version, filename: grep version package.json```
- **Find keyword search**: ```command name, keyword, filename: grep react package.json```
- **Find keyword in more than 1 file**: ```command name, keyword, filename: grep “#” README.md codestyle.md xyz.md```
- **Find by keyword in all files ending with file type**: ```command name, keyword, *.fileextension: grep “#” *.md```
 
2. Search directory contents recursively using grep:

- **Search recursively in folder root**: ```commandname, -r, keyword, path: grep -r react ./```
- **Search recursively in folder path (relative to your current path not the actual)**: ```grep -r react public/components/App.js```
 
3. Use find to search for filename patterns (grep vs find):

- **Search filename patterns**: ```command name, path, -name, “*fileextension”: find . -name, “*jsx”```
 
4. Search Matching files by combining find and grep with xargs:

- **Pipe find into grep**: ```find examples -name “*Spec.js” | barges grep “module”```
- **Same as above but just grep**: ```grep -r —include=“Spec.js” “should” examples/```

5. Search the contents of a git repository with git grep:

- **Find in git that is being tracked in version control**: ```git grep bind (query string); results are highlighted in red```
- **Color keyword query**: ```grep -r —color bind ./```
 
6. Show context around matches using grep:

- **Line number**: ```grep -n “#” *.md```
- **After**: ```grep -A 2 —color “#” *.md```
- **Before**: ```grep -A 2 —color “#” *.md```
- **Context (before + after)**: ```grep -C 2 —color “#” *.md```
               
7. Search for basic patterns using grep:

- **Everything that matches after the string like http**: ```grep —color “http.” readme.md```
- **Special Character like dot, use backslash**: ```grep —color “\.com” readme.md```
- **All characters b/w special characters like ()**: ```grep —color ”(.*)” readme.md```
 
8. Using grep’s extended regular expressions to find complex patterns:

- **Conditional Search for character 0 or 1 time (?)**: ```grep —color “https\?” readme.md```
- **Atleast 1 or more occurances (+)**: ```grep —color “https\+” readme.md```
- **Atlas 0 or more occurances (*)**: ```grep -color “https*” readme.md```
- **Escape for special characters**: ```grep -E or backslash (\)```
               
9. Search for optional patterns with grep OR:

- **Color Check**: ```echo “is it grey or gray?” | grep —color “grey\|gray” or echo “is it grey or gray?” | grep —color -E “grey|gray”```
- **Spell check in your codebase (-rE recursive&Escape)**: ```grep —color -rE “grey|gray” examples/```
 
10. Specify line beginning and end in patterns using grep:

- **Anchor for beginning of the line**: ```grep —color “^#” app-spec.md```
- **Anchor for ending of the line**: ```grep —color “,$” app-spec.md```
- **Complex Anchor with wildcard phrase**: ```grep —color -r “^import .* from” examples/```
 
11. Match classes of characters using bracket expressions with grep:

- **Match a or b**: ```echo abc123 | grep —color “[ab]”```
- **Range**: ```echo abc123 | grep —color “[a-z]”```
- **Range**: ```echo abc123 | grep —color “[1-9]”```
- **Match word with some pattern (matches designer and developer)**: ```grep —color “de[a-z]*er” readme.md ```
- **Same as above but don’t have to explicit define the character range (matches developer&designer)**: ```grep —color “de[[:alpha:]]*er” readme.md```
- **Case insesitive match on only 1 character**: ```find . -name “*js” | grep —color “[sS]pec”```

12. Search with groups using grep:

- **Single quote after the grey or gray**: ```grep -rE —color “(grey|gray)\’” .```
- **Single or double quote**: ```grep -rE —color “(grey|gray)(\’|\”)” .```
 
13. Find matches excluding  a pattern with grep:

- **Inverse search (stuff that does’t match)**: ```find examples/angularjs -name “*js” | grep -v “node modules”```
- **Inverse Search combo**: ```find examples -name “*js” | grep -vE “node_modules|Spec”```


## GIT Commands:
- **Resetting git**: ```git reset --hard HEAD```
- **Pull to original settings**: ```git pull - - rebase```
- **If you don't care about any local changes and just want a copy from the repo:**:
```
git reset --hard HEAD
git clean -f
git pull
```

## NPM Commands:
- **Omit npm config**: ```npm init -y```
- **Alias shortcut**: ```npm install —save alias: npm i -S```
- **Dev shortcut**: ```npm —save-dev: npm i -D```
