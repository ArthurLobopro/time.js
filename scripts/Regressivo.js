import alert from "./browser-functions/alert.js"
const get = id => document.getElementById(id)
const formatTime = time => String(time).padStart(2, '0')

//Controladores
const regMainButton = get("reg-init")
const regResetButton = get("reg-reset")
const regDisplayTime = get("reg-time")
const regInputs = get("reg-inputs")
const regH = get("reg-h")
const regM = get("reg-m")
const regS = get("reg-s")
const spanHours = get('reg-hours')
const spanMinutes = get('reg-minutes')
const spanSeconds = get('reg-seconds')

regResetButton.onclick = () =>{
    Regressivo.reset()
    regInputs.style.display = ""
    regResetButton.style.display = "none"
    regDisplayTime.style.display = "none"
    regMainButton.innerText = "Iniciar"
    regMainButton.onclick = regInit
}

const regInit = () => {
   
    if(Number(regH.value) + Number(regM.value) + Number(regS.value) == 0){
        alert({title: "Erro!", text:"Informe um tempo para iniciar."})
    }else{
        Regressivo.init()
        regInputs.style.display = "none"
        regDisplayTime.style.display = ""
        regMainButton.innerText = "Pausar"
        regMainButton.onclick = regPause
        regResetButton.style.display = ""
    }
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
const newreg = () => {
    regDisplayTime.classList.remove("pisc")
    regInputs.style.display = ""
    regDisplayTime.style.display = "none"
    regMainButton.innerText = "Iniciar"
    regMainButton.onclick = regInit
}
regMainButton.onclick = regInit

const Regressivo = {
    dateInit: null,
    dateEnd: null,
    diference: 0,
    interval: null,
    init(){
        const hours = Number(regH.value) * ( 60 * 60 * 1000)
        const minutes = Number(regM.value) * (60 * 1000)
        const seconds = Number(regS.value) * 1000
        const time_to_ms = hours + minutes + seconds

        this.dateInit = new Date() - 0
        this.dateEnd = this.dateInit + time_to_ms
        this.diference = (new Date(this.dateInit) - new Date(this.dateEnd)) * -1
        this.updateView()
        this.interval = setInterval(() => {
        this.diference -= 1000
        this.updateView()
        if(this.diference <= 0){
            this.end()
        }
    }, 1000);        
    },
    updateView(){
        const oneHour = 60 * 60 * 1000
        const oneMinute = 60 * 1000
        const oneSecond = 1000

        let diference = this.diference

        let hours = Math.trunc(diference / oneHour)
        diference -= hours * oneHour
        let minutes = Math.trunc(diference / oneMinute)
        diference-= minutes * oneMinute
        let seconds = Math.trunc(diference / oneSecond);

        spanHours.innerText = formatTime(hours)
        spanMinutes.innerText = formatTime(minutes)
        spanSeconds.innerText = formatTime(seconds)
    },
    pause(){
        this.dateInit = null
        this.diference = null
        clearInterval(this.interval)
    },
    play(){
        let time = get("reg-time").innerText
        time = time.replaceAll("\n","").replaceAll(" ","\n").split(":")
        const hours = Number(time[0]) * 60 * 60 * 1000
        const minutes = Number(time[1]) * 60 * 1000
        const seconds = Number(time[2]) * 1000
        const time_to_ms = hours + minutes + seconds

        this.dateInit = new Date() - 0
        this.dateEnd = this.dateInit + time_to_ms
        this.diference = (new Date(this.dateInit) - new Date(this.dateEnd)) * -1
        this.updateView()
        this.interval = setInterval(() => {
            this.diference -= 1000
            this.updateView()
            if(this.diference <= 0){
                this.end()
            }
        }, 1000);
    },
    end(){
        clearInterval(this.interval)
        regDisplayTime.classList.add("pisc")
        regMainButton.innerText = "Nova contagem"
        regMainButton.onclick = newreg
        regResetButton.style.display = "none"
    },
    reset(){
        clearInterval(this.interval)
        spanHours.innerText = "00"
        spanMinutes.innerText = "00"
        spanSeconds.innerText = "00"
        regMainButton.innerText = "Nova contagem"
        regMainButton.onclick = newreg
    }
}
export { Regressivo }