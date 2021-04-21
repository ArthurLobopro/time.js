const {app, BrowserWindow, ipcMain} = require("electron")
const Path = require('path')

require("electron-reload")(__dirname, {
    electron: require(`${__dirname}/../node_modules/electron`),
});

let win
function mainWindow() {

    win = new BrowserWindow({
        width: 600,
        height: 400,
        offscreen: true,
        icon: Path.join(__dirname,"../assets/headerIcon.png"),
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