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
npm run build:production
echo "Creating log..."
{
  echo "site: playercalculator@https://github.io/nathanielinman/adventuresunlimited/calculators/player";
  echo "date: $TODAY";
  echo "user: $USER";
  echo "hash: $HASH";
  echo "application: playercalculator";
  echo "version: $VERSION";
} > ./dist/deploy.txt
echo "Packaging files..."
cd ./dist
tar -czvf ../playercalculator.tar.gz .
cd ../
echo "Moving files to branch..."
git stash
git checkout github.io
echo "Extracting files..."
rm -rf *
git stash pop
sudo tar -C ./playercalculator.tar.gz -zxvf playercalculator.tar.gz
echo "Cleaning up deployment files..."
rm ./playercalculator.tar.gz
echo "Committing changes..."
git add -A
git commit -m 'Updated playercalculator assets'
git push
echo "Verifying successful deploy..."
git checkout master
sleep 5
curl https://github.io/nathanielinman/adventureslimited/calculators/player/deploy.txt
