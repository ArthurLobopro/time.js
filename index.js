import { Cronometro } from "./scripts/Cronometro.js";
import { Relogio } from "./scripts/Relogio.js";
import { Regressivo } from "./scripts/Regressivo.js";

const get = id => document.getElementById(id)

const relogio = new Relogio()
relogio.init()

//Detecção de eventos

//Menu de funções
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
    }
}

//Cronometro
const croMainButton = get('cro-init')
const croResetButton = get('cro-reset')

const pausaCronometro = ()=>{
    Cronometro.pause()
    croMainButton.innerText = "Reiniciar"
    croMainButton.onclick = () => {
        Cronometro.end()
        initCronometro()
    }
    croResetButton.style.display = ""
}

// const playCronometro = () => {
//     Cronometro.play()
//     croMainButton.innerText = "Pause"
//     croMainButton.onclick = pausaCronometro
//     croResetButton.style.display = "none"
// }

const initCronometro = () =>{
    Cronometro.init()
    croMainButton.innerText = "Parar"
    croMainButton.onclick = pausaCronometro
    croResetButton.style.display = "none"
}

croMainButton.onclick = initCronometro

croResetButton.onclick = ()=> {
    Cronometro.end()
    Cronometro.updateTime()
    croMainButton.innerHTML = "Iniciar"
    croResetButton.style.display="none"
}

//Regressivo
const regMainButton = get("reg-init")
const regDisplayTime = get("reg-time")
const regInputs = get("reg-inputs")

const regInit = () => {
    Regressivo.init()
    regInputs.style.display = "none"
    regDisplayTime.style.display = ""
    regMainButton.innerText = "Pausar"
    regMainButton.onclick = regPause 
}
const regPause = () => {
    Regressivo.pause()
    regMainButton.innerText = "Continuar"
    regMainButton.onclick = regPlay
}
const regPlay = () => {
    Regressivo.play()
    regMainButton.innerText = "Pausar"
    regMainButton.onclick = regPause
}
regMainButton.onclick = regInit