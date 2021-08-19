export default function injectCSS(cssPath: string){
    const css = document.createElement('link')
    css.href = cssPath
    css.rel = 'stylesheet'
    document.head.appendChild(css)
}