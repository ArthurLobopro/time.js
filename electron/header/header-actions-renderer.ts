import { ipcRenderer } from 'electron'
import make_header from "./make-header"
import path from 'path'
import injectCSS from '../cssInject'

const appPath = ipcRenderer.sendSync('request-app-path')

const get = (id: string) => document.getElementById(id) as HTMLElement
function init(){
    const cssPath = path.resolve(path.resolve(appPath , 'public/css/header', 'header.css'))
    injectCSS(cssPath)

    document.body.style.paddingTop = "30px"

    const header = make_header()
    document.body.appendChild(header)

    // const windowNameLabel = get("window-name")
    // windowNameLabel.innerText = document.head.title

    const links = document.querySelectorAll("link")
    for(let e of links){
        if(e.rel.search("icon") !== -1){
            const windowIcon = get("window-icon")
            let image = new Image()
            image.src = e.href
            image.onload = () => {
                windowIcon.appendChild(image)
            }
        }
    }

    const minimize_btn = get("minimize")
    minimize_btn.onclick = ()=> ipcRenderer.send('minimize') 

    const maxime_btn = get("expand")
    maxime_btn.onclick = () => ipcRenderer.send('expand')

    const close_btn = get("close")
    close_btn.onclick = () => ipcRenderer.send('close')
}

module.exports = init()