const get = id => document.getElementById(id)
const formatTime = time => String(time).padStart(2, '0')

class Relogio {
    interval = null
    init(){
       this.interval = setInterval(() => {
            this.updateTime()
        }, 1000);
    }
    updateTime() {
        const date = new Date()
        const spanHours = get('rel-hours')
        const spanMinutes = get('rel-minutes')
        const spanSeconds = get('rel-seconds')
        spanHours.innerText = formatTime(date.getHours())
        spanMinutes.innerText = formatTime(date.getMinutes())
        spanSeconds.innerText = formatTime(date.getSeconds())
    }
    end(){
        clearInterval(this.interval)
    }
}

export { Relogio }