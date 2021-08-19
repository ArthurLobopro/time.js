import { ipcRenderer } from 'electron'
import { resolve } from 'path'

const appPath = ipcRenderer.sendSync('request-app-path')


const make_header = () => {

    const iconsPath = resolve(appPath, 'assets', 'windowsIcons')

    const header = document.createElement('div')

    header.id = "electron-header"
    header.innerHTML = `
    <div class="left">
        <div id="window-icon"></div>
        <div id="window-name">${(document.querySelector('title') as HTMLTitleElement).innerText}</div>
    </div>
    <div class="right">
        <div>
            <img src="${resolve(iconsPath, 'traco.png')}" alt="Minimaze" title="Minimizar" id="minimize">
        </div>
        <div>
            <img src="${resolve(iconsPath, 'expand.png')}" alt="Maximize" title="Expandir" id="expand">
        </div>
        <div>
            <img src="${resolve(iconsPath , 'x.png')}" alt="Close" title="Fechar" id="close">
        </div>
    </div>`
    return header
}
export default make_header