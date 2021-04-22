const {app, BrowserWindow, ipcMain} = require("electron")
const Path = require('path')

let win
function mainWindow() {

    win = new BrowserWindow({
        minWidth: 600,
        width: 600,
        height: 400,
        minHeight: 400,
        offscreen: true,
        frame: false,
        icon: Path.join(__dirname,"../assets/icon32.png"),
        webPreferences:{
            nodeIntegration: true,
            preload: Path.join(__dirname, 'preload.js')
        }
    })
    //win.setMenu(null)
    win.setMenuBarVisibility(false)
    win.loadFile('index.html')
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

ipcMain.on('minimize',(event,arg)=>{
    const win = BrowserWindow.getFocusedWindow()
    win.minimize()
})

ipcMain.on('expand', (event,arg) => {
    const win = BrowserWindow.getFocusedWindow()
    if(win.isMaximized()){
        win.restore()
    }else{
        win.maximize()
    }
})

ipcMain.on('close',(event,arg) => {
    const win = BrowserWindow.getFocusedWindow()
    win.close()
})

// Faz com que o programa não inicie várias vezes durante a instalação
if (require('electron-squirrel-startup')){
    return app.quit();
}