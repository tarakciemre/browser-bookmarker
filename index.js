import { app, BrowserWindow } from "electron";
import path from "path";

app.on("ready", () => {
  const appPath = app.getAppPath(); // Gets the path to your app's directory
  const preloadPath = path.join(appPath, 'preload.js');
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: preloadPath,
    },
  });

  const indexPath = path.join(appPath, "public/index.html");
  mainWindow.loadFile(indexPath);
  mainWindow.webContents.openDevTools();
});
