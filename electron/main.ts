import { app, BrowserWindow, ipcMain } from "electron"
import Path from 'path'

//Ações de Minimizar, fechar, maximizar
require("./header/header-actions-main.js")

const appPath = app.getAppPath()

function mainWindow() {

    const win = new BrowserWindow({
        minWidth: 600,
        width: 600,
        height: 400,
        minHeight: 400,
        frame: false,
        icon: Path.resolve(appPath, "assets/icon32.png"),
        webPreferences: {
            nodeIntegration: true,
            preload: Path.join(__dirname, 'preload.js')
        }
    })
    //win.setMenu(null)
    win.setMenuBarVisibility(false)
    win.loadFile(Path.resolve(appPath, 'public', 'index.html'))
}

app.whenReady().then(mainWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow()
    }
})

ipcMain.on('request-app-path', (event, arg) => {
    event.returnValue = appPath
})

// Faz com que o programa não inicie várias vezes durante a instalação
if (require('electron-squirrel-startup')) {
    app.quit();
}