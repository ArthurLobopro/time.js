import { Cronometro } from "./Cronometro"
import { Relogio } from "./Relogio";
import "./Regressivo"

const get = (id: string) => document.getElementById(id) as HTMLElement

const relogio = new Relogio()
relogio.init()

//Detecção de eventos

//Menu de funções
const list = document.querySelectorAll("li") as NodeListOf<HTMLLIElement>
list.forEach( li => {
    li.onclick = (event: any) => {
        const view = [get("relogio"), get("cronometro"), get("regressivo")]
        view.forEach( (el: any) => el.style.display = "none")
        const name = event.target.dataset.name
        const element = get(name) as any
        element.style.display = ""
        list.forEach(li => li.classList.remove('clicked'))
        event.target.classList.add("clicked")
    }
});


//Cronometro
const croMainButton = get('cro-init')
const croResetButton = get('cro-reset')

const pausaCronometro = () => {
    Cronometro.pause()
    croMainButton.innerText = "Play"
    croMainButton.onclick = playCronometro
    croResetButton.style.display = ""
}

const playCronometro = () => {
    Cronometro.play()
    croMainButton.innerText = "Pause"
    croMainButton.onclick = pausaCronometro
    croResetButton.style.display = "none"
}

const initCronometro = () => {
    Cronometro.init()
    croMainButton.innerText = "Pausar"
    croMainButton.onclick = pausaCronometro
    croResetButton.style.display = "none"
}

croMainButton.onclick = initCronometro

croResetButton.onclick = () => {
    Cronometro.end()
    croMainButton.innerHTML = "Iniciar"
    croResetButton.style.display = "none"
}