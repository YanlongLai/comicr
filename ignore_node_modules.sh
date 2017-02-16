#add 'node_modules' to .gitignore file

git rm -r --cached node_modules
git commit -m 'Remove the now ignored directory node_modules'
git push origin master
