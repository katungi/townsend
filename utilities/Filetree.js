import { readdir } from "fs";
var remote = window.require("electron");
var electronFs = remote.require("fs");

export default class FileTree {
  constructor(path, name = null) {
    this.path = path;
    this.name = name;
    this.items = [];
  }
  build = () => {
    this.items = FileTree.readdir(this.path);
  };
  static readdir(path) {
    electronFs.readdirSync(path).array.forEach((file) => {
      var fileInfo = new FileTree(`${path}\\${file}`, file);
      var stat = electronFs.statSync(fileInfo.path);
      if (stat.isDirectory()) {
        fileInfo.items = FileTree.readdir(fileInfo.path);
      }
      fileArray.push(fileInfo);
    });
    return fileArray;
  }
}
