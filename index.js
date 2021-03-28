import { Cronometro } from "./scripts/Cronometro.js";
import { Relogio } from "./scripts/Relogio.js";

const get = id => document.getElementById(id)

class Regressivo{
    hours = null
    minutes = null
    seconds = null
    init(){

    }
}

const list = document.querySelectorAll("li")
for (let e of list) {
    e.onclick = event => {
        const view = [get("relogio"),get("cronometro"),get("regressivo")]
        for(let e of view){ 
            e.style.display="none" 
        }
        const name = event.target.dataset.name
        const element = get(name)
        element.style.display= ""
        for(let e of list){
            e.classList.remove('clicked')
        }
        event.target.classList.add("clicked")
        get('buttons').style.display = (name != 'relogio') ? "" : "none"
    }
}

let relogio = new Relogio()
relogio.init()
let cronometro = new Cronometro()


const mainButton = get('init')
const resetButton = get('reset')

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

mainButton.onclick = playCronometro
resetButton.onclick = ()=> {
    cronometro.end()
    cronometro.updateTime()
    mainButton.innerHTML = "Iniciar"
    resetButton.style.display="none"
}
