const get = id => document.getElementById(id)
const formatTime = time => String(time).padStart(2, '0')

class Cronometro{
    miliseconds = 0
    seconds =  0
    minutes = 0
    hours = 0
    interval = null
    init(){
        this.interval = setInterval(() => {
            this.miliseconds++
            if(this.miliseconds == 100){
                this.miliseconds = 0
                this.seconds++
            }
            if(this.seconds == 60){
                this.seconds = 0
                this.minutes++
            }
            if(this.minutes == 60){
                this.minutes = 0
                this.hours++
            }
            this.updateTime()
        }, 10);
    }
    updateTime(){
        const spanHours = get('cro-hours')
        const spanMinutes = get('cro-minutes')
        const spanSeconds = get('cro-seconds')
        const spanMiliseconds = get('cro-miliseconds')
        spanMiliseconds.innerText = formatTime(this.miliseconds)
        spanHours.innerText = formatTime(this.hours)
        spanMinutes.innerText = formatTime(this.minutes)
        spanSeconds.innerText = formatTime(this.seconds)
    }
    pause(){
        clearInterval(this.interval)
    }
    end(){
        clearInterval(this.interval)
        this.miliseconds = 0
        this.seconds = 0
        this.minutes = 0
        this.hours = 0
    }
}

export { Cronometro }