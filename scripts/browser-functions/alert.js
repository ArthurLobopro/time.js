const target = document.body

function alert({title, text, center = true, animation = true}) {
    const div = document.createElement('div')
    div.classList = `full ${center? 'al-center' : ''}`
    div.id = "alert"
    div.innerHTML = `
    <div id="alert-interior" class="${animation ? "down" : ""}">
        <div class="title">${title}</div>
        <div class="text"> ${text}</div>
        <button id="remove-alert">
            OK
        </button>
    </div>`
    target.appendChild(div)
    const removeAlert = () => target.removeChild(div)
    document.getElementById("remove-alert").onclick = removeAlert
}

if(!document.getElementById("alert-style")){
    let path = window.location.pathname.split("/")
    path.pop()
    path.shift()
    path = path.join('/') + "/scripts/browser-functions/alert.css"
    const css = document.createElement('link')
    css.rel = "stylesheet"
    css.href = path
    css.id = "alert-style"
    document.querySelector('head').appendChild(css)
}

export default alert