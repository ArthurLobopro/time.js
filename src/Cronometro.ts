import { formatTime, get } from "./Util";

interface Cronometro {
    miliseconds: number
    seconds: number
    minutes: number
    hours: number
    start:  Date | number | null
    pausedStart: number | Date
    pausedTime: number
    interval: any
    init: VoidFunction,
    updateTime: VoidFunction
    updateView: VoidFunction
    pause: VoidFunction
    play: VoidFunction
    end: VoidFunction
}

const Cronometro: Cronometro = {
    miliseconds: 0,
    seconds:  0,
    minutes: 0,
    hours: 0,
    start: null,
    pausedStart: 0,
    pausedTime: 0,
    interval: null,
    init(){
        this.start = new Date()
        this.interval = setInterval(() => {
            this.updateTime()
            this.updateView()
        }, 1);
    },
    updateTime(){
        const oneHour = 60 * 60 * 1000
        const oneMinute = 60 * 1000
        const oneSecond = 1000

        let diference = Number(new Date()) - Number(this.start) - this.pausedTime

        let hours = Math.trunc(diference / oneHour)
        diference -= hours * oneHour
        let minutes = Math.trunc(diference / oneMinute)
        diference-= minutes * oneMinute
        let seconds = Math.trunc(diference / oneSecond);
        diference -= seconds * oneSecond
        let miliseconds = diference % oneSecond;
        
        this.miliseconds = miliseconds
        this.seconds = seconds
        this.minutes = minutes
        this.hours = hours
    },
    updateView(){
        const spanHours = get('cro-hours') 
        const spanMinutes = get('cro-minutes') 
        const spanSeconds = get('cro-seconds')
        const spanMiliseconds = get('cro-miliseconds')
        spanMiliseconds.innerText = formatTime(this.miliseconds,3)
        spanHours.innerText = formatTime(this.hours)
        spanMinutes.innerText = formatTime(this.minutes)
        spanSeconds.innerText = formatTime(this.seconds)
    },
    // Pause e play em testes
    pause(){
        clearInterval(this.interval)
        this.pausedStart = new Date()
        // this.interval = setInterval(() => {
        //     this.pausedTime = new Date() - this.pausedStart 
        // }, 1);
    },
    play(){
        //clearInterval(this.interval)
        this.pausedTime += Number(new Date()) - Number(this.pausedStart)
        this.pausedStart = 0
        this.interval = setInterval(() => {
            this.updateTime()
            this.updateView()
        }, 1)
    },
    end(){
        clearInterval(this.interval)
        this.pausedTime = 0
        this.pausedStart = 0
        this.start = 0

        this.miliseconds = 0
        this.seconds = 0
        this.minutes = 0
        this.hours = 0
        
        this.updateView()
    }
}
export { Cronometro }