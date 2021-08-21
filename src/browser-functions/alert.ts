import { ipcRenderer } from "electron"
import path from 'path'
import injectCSS from "../../electron/cssInject"
import { get } from "../Util"


const target = document.body

interface alertArgs{
    title: string
    text: string
    center?: boolean
    animation?: boolean
}

function alert({title, text, center = true, animation = true}: alertArgs) {
    const div = document.createElement('div')
    div.className = `full ${center? 'al-center' : ''}`
    div.id = "alert"
    div.innerHTML = `
    <div id="alert-interior" class="${animation ? "down" : ""}">
        <div class="title">${title}</div>
        <div class="text"> ${text}</div>
        <button id="remove-alert">
            OK
        </button>
    </div>`
    target.appendChild(div)
    const removeAlert = () => {target.removeChild(div)}
    get("remove-alert").onclick = removeAlert
}

const appPath = ipcRenderer.sendSync('request-app-path')
const cssPath = path.resolve(appPath, 'public/css', 'alert.css')
injectCSS(cssPath)

export default alert