const {app, BrowserWindow, ipcMain} = require("electron")
const Path = require('path')

require("electron-reload")(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`),
});

let win
function mainWindow() {

    win = new BrowserWindow({
        width: 600,
        height: 400,
        offscreen: true,
        icon: Path.join(__dirname,"build/headerIcon.png"),
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

//const { Cronometro } = require('./scripts/Cronometro.js')
//const get = id => document.getElementById(id)
const formatTime = time => String(time).padStart(2, '0')

class Cronometro{
    miliseconds = 0
    seconds =  0
    minutes = 0
    hours = 0
    interval = null
    init(){
        this.interval = setInterval(() => {
            this.miliseconds++
            if(this.miliseconds == 100){
                this.miliseconds = 0
                this.seconds++
            }
            if(this.seconds == 60){
                this.seconds = 0
                this.minutes++
            }
            if(this.minutes == 60){
                this.minutes = 0
                this.hours++
            }
            this.updateTime()
        }, 10);
    }
    updateTime(){
        // const spanHours = get('cro-hours')
        // const spanMinutes = get('cro-minutes')
        // const spanSeconds = get('cro-seconds')
        // const spanMiliseconds = get('cro-miliseconds')
        // spanMiliseconds.innerText = formatTime(this.miliseconds)
        // spanHours.innerText = formatTime(this.hours)
        // spanMinutes.innerText = formatTime(this.minutes)
        // spanSeconds.innerText = formatTime(this.seconds)
        ipcMain.emit('cro-reply',{
            hours:this.hours,
            minutes: this.minutes,
            seconds:this.seconds,
            miliseconds:this.miliseconds
        })
    }
    pause(){
        clearInterval(this.interval)
    }
    end(){
        clearInterval(this.interval)
        this.miliseconds = 0
        this.seconds = 0
        this.minutes = 0
        this.hours = 0
    }
    getInfo(){
        return {
            hours:this.hours,
            minutes: this.minutes,
            seconds:this.seconds,
            miliseconds:this.miliseconds
        }
    }
}
let cronometro = new Cronometro()

ipcMain.on('cro-play', (event, arg)=> {
   cronometro.init()
   event.returnValue = console.log('teste')
})
ipcMain.on('request-cro', (event)=>{
    event.returnValue = cronometro.getInfo()
})