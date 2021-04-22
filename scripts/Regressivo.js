const get = id => document.getElementById(id)
const formatTime = time => String(time).padStart(2, '0')

const Regressivo = {
    dateInit: null,
    dateEnd: null,
    diference: 0,
    interval: null,
    init(){
        const hours = Number(get("reg-h").value) * ( 60 * 60 * 1000)
        const minutes = Number(get("reg-m").value) * (60 * 1000)
        const seconds = Number(get("reg-s").value) * 1000
        const time_to_ms = hours + minutes + seconds
        this.dateInit = new Date() - 0
        this.dateEnd = this.dateInit + time_to_ms
        this.diference = (new Date(this.dateInit) - new Date(this.dateEnd)) * -1
        this.updateView()
        this.interval = setInterval(() => {
            this.diference -= 1000
            this.updateView()
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

        const spanHours = get('reg-hours')
        const spanMinutes = get('reg-minutes')
        const spanSeconds = get('reg-seconds')
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
        }, 1000);

    }
}
export { Regressivo }