import { Cronometro } from "./scripts/Cronometro.js";
import { Relogio } from "./scripts/Relogio.js";

const get = id => document.getElementById(id)

class Regressivo{
    constructor({hours= 0, minutes=0, seconds=0}){
        this.hours = hours
        this.minutes = minutes
        this.seconds = seconds
    }
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



const mainButton = get('init')
const resetButton = get('reset')

const pausaCronometro = ()=>{
    Cronometro.pause()
    mainButton.innerText = "Reiniciar"
    mainButton.onclick = () => {
        Cronometro.end()
        initCronometro()
    }
    resetButton.style.display = ""
}

// const playCronometro = () => {
//     Cronometro.play()
//     mainButton.innerText = "Pause"
//     mainButton.onclick = pausaCronometro
//     resetButton.style.display = "none"
// }

const initCronometro = () =>{
    Cronometro.init()
    mainButton.innerText = "Parar"
    mainButton.onclick = pausaCronometro
    resetButton.style.display = "none"
}

mainButton.onclick = initCronometro

resetButton.onclick = ()=> {
    Cronometro.end()
    Cronometro.updateTime()
    mainButton.innerHTML = "Iniciar"
    resetButton.style.display="none"
}
