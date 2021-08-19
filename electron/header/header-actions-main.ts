import { ipcMain, BrowserWindow } from "electron"

function setWindowActions(){
    ipcMain.on('minimize',(event,arg)=>{
        const win = BrowserWindow.getFocusedWindow() as BrowserWindow
        win.minimize()
    })
    
    ipcMain.on('expand', (event,arg) => {
        const win = BrowserWindow.getFocusedWindow() as BrowserWindow
        if(win.isMaximized()){
            win.restore()
        }else{
            win.maximize()
        }
    })
    
    ipcMain.on('close',(event,arg) => {
        const win = BrowserWindow.getFocusedWindow() as BrowserWindow
        win.close()
    })
}

export default setWindowActions()