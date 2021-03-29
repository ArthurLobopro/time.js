const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', ()=> {
    const mainButton = get('init')
    const pausaCronometro = ()=>{
        cronometro.pause()
        mainButton.innerText = "Retomar"
        mainButton.onclick = playCronometro
        resetButton.style.display = ""
    }
    const playCronometro = () =>{
        cronometro.init()
        mainButton.innerText = "Pause"
        mainButton.onclick = pausaCronometro
        resetButton.style.display = "none"
    }

    //mainButton.onclick = playCronometro

    mainButton.onclick = ()=>{
    ipcRenderer.send('cro-play', ()=> console.log('teste'))
}
})