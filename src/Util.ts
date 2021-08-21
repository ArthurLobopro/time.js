const get = (id: string) => document.getElementById(id) as HTMLElement
const formatTime = (time: string | number, length = 2) => String(time).padStart(length, '0')


export { get, formatTime }