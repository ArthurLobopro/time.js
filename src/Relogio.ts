const get = (id: string) => document.getElementById(id) as HTMLElement
const formatTime = (time: string | number) => String(time).padStart(2, '0')

class Relogio {
    interval:  any = null
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

//module.exports = { Relogio }
export { Relogio }