#!/bin/bash
nohup sh -c mongod & 
node /src/server.js
