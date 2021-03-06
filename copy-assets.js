#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const target = process.argv[2]

if (!target) {
  console.log('Please provide a target')
  process.exit(1)
}

fs.stat(path.join(target,'fonts'),(err,stat)=>{
  if(err){
    console.log("error");
   fs.mkdir(path.join(target,'fonts')); 
  } else
 if (!stat.isDirectory()){
   fs.mkdir(path.join(target,'fonts'));
 } 
});

fs.stat(path.join(target,'images'),(err,stat)=>{
  
  if(err){
    console.log("error");
   fs.mkdir(path.join(target,'images')); 
  } else
 if (!stat.isDirectory()){
   fs.mkdir(path.join(target,'images'));
 } 
});


const copyContent = function (sourceDir, targetDir) {
  fs.readdir(sourceDir, function (err, names) {
    if (err) {
      throw err
    }

    names.forEach(function (name) {
      fs.createReadStream(path.join(path.join(sourceDir, name)))
        .pipe(fs.createWriteStream(path.join(targetDir, name)))
    })
  })
}

// Copy fonts from here
copyContent(path.join(__dirname, 'assets', 'fonts'), path.join(target, 'fonts'))

// Copy images from here
copyContent(path.join(__dirname, 'assets', 'images'), path.join(target, 'images'))

// Copy fonts from bootstrap
copyContent(path.join('node_modules', 'bootstrap', 'fonts'), path.join(target, 'fonts'))
