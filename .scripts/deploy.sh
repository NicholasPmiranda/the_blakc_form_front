#!/bin/bash

git pull origin main

export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh

npm install --yes
npm run build

