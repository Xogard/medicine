var fs = require('fs');


"use strict";

const parameter_file = "parameters.json";

function _writeFile(newFilePath,newFileContent){
  console.log('write');
  console.log(newFilePath);
  console.log(newFileContent);
  return new Promise((resolve,reject) => {
  fs.writeFile(newFilePath,JSON.stringify(newFileContent),'utf8', (err) => {
    if (err) reject(err);
    resolve('The file has been saved!');
    
  })}
  
  ) 
}
function _readCfgFile(cfgFilePath){
  console.log('read');
  return new Promise((resolve,reject) => {
    fs.readFile(cfgFilePath, (err, data) => {
      if (err) reject(err);
        let fileContent = JSON.parse(data);
        let request_log_folder = fileContent["request_log"];
        if (request_log_folder) {
          let aux = request_log_folder + "/" + Date.now().toString() + ".log";
          resolve(aux);
        }
      });
  })}

function _openFile(filePath){
  console.log('open');
  return new Promise((resolve,reject) => {
    fs.open(filePath, 'r', (err) => {
      if (err) {
        //reject(err);
        }
        resolve(filePath);
      })
    })
  }


module.exports = { 

  log_request:function(req,res,next) {  
  var request_aux = res["req"]["headers"];
  var err = '';
  let filePathResult = "";
  _readCfgFile(parameter_file).then(_openFile)
  .then(function(result){    
    _writeFile(result,request_aux).then(function(data){
      console.log(data);
      next() })
  }),function(data){
    console.log(data);
    next()
  }

}

};
