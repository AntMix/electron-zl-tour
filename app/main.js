// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')

const path = require('path');
const iconPath = path.join(__dirname, 'logo.ico')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
// set menu template
const menu = Menu.buildFromTemplate([])
Menu.setApplicationMenu(menu)

function createWindow() {

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    maximizable: false,
    icon: iconPath,
    title: '商户助手',
    width: 800,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // and load the index.html of the app.
  mainWindow.loadFile('./app/index.html')
  // mainWindow.loadURL('https://local.zhonglian.com/admin/index')
  // Open the DevTools.
  // mainWindow.maximize()
  // mainWindow.webContents.openDevTools()

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url === 'https://life.douyin.com/p/login') {
      return { action: 'deny' }
    }
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        icon: iconPath,
        webPreferences: {
          nodeIntegration: true,
          preload: path.join(__dirname, 'preload_child.js')
        }
      }
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
