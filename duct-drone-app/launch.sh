#!/bin/bash
# Install all required node modules as specified in package.json
npm install
# Compile front end react files
npm run build
#launch node server @ localhost:5000
node ./server/index.js