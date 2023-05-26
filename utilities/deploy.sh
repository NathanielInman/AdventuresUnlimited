#!/bin/bash

# Main variables
VERSION=$(awk '/version/{gsub(/("|",)/,"",$2);print $2};' package.json)
HASH=$(git rev-parse head)
TODAY=$(date)
USER=$(whoami)

# Now package and move to server
echo "Cleaning distribution folder..."
rm -rf dist
echo "Compiling production build..."
npm run build
echo "Creating log..."
{
  echo "site: utilities@https://github.io/nathanielinman/adventuresunlimited/utilities";
  echo "date: $TODAY";
  echo "user: $USER";
  echo "hash: $HASH";
  echo "application: utilities";
  echo "version: $VERSION";
} > ./dist/deploy.txt
echo "Packaging files..."
cd ./dist
tar -czvf ../utilities.tar.gz .
cd ../
echo "Moving files to branch..."
git stash
git checkout github.io
echo "Extracting files..."
rm -rf *
git stash pop
sudo tar -C ./ -zxvf utilities.tar.gz
echo "Cleaning up deployment files..."
rm ./utilities.tar.gz
echo "Committing changes..."
git add -A
git commit -m 'Updated utilities assets'
git push
echo "Verifying successful deploy..."
git checkout master
sleep 5
curl https://github.io/nathanielinman/adventureslimited/deploy.txt
