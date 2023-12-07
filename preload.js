// preload.js
import { contextBridge } from 'electron';

console.log("preload.js is LOADED")
contextBridge.exposeInMainWorld('myAPI', {
  dirname: __dirname,
});
