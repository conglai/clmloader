'use strict';
const fs = require('fs');
const co = require('co');
const path = require('path');
//# 加载目录下的模块
// * args.path(*): 目录路径
// * args.deps(*): 依赖的数组
// * args.pre: map中的前缀
// * args.defaultFile: 默认加载的文件名
// * args.attach: 附加上的配置
// * args.shouldLoadFile: 选择加载目录还是文件
// return Promise.resolve(Map);
module.exports = function(args) {
  let files = fs.readdirSync(args.path);
  let defaultFile = args.defaultFile || 'index';
  let shouldLoadFile = !!args.shouldLoadFile;
  let ctx = args.ctx || {};
  return co(function*(){
    let map = {};
    let keys = [];
    if(args.attach) {
      keys = Object.keys(args.attach);
    }
    for(let i = files.length - 1; i >= 0; i --) {
      let file = files[i];
      let fullPath = `${args.path}/${file}`;
      let stat = fs.lstatSync(fullPath);
      let filePath, modName;
      if(!shouldLoadFile && stat.isDirectory()) {
        filePath = `${fullPath}/${defaultFile}.js`;
        modName = file;
      } else if(shouldLoadFile && stat.isFile() && path.extname(file) === '.js') {
        filePath = fullPath;
        modName = file.replace(/\.js$/, '');
      }
      if(filePath) {
        let modFunc = require(filePath);
        let modObj = yield modFunc.apply(ctx, args.deps);
        modObj.name = modName;
        keys.forEach(key => {
          modObj[key] = modObj[key] || args.attach[key];
        });
        map[modName] = modObj;
      }
    }
    return map;
  });
};
