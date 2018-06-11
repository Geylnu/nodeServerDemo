function JSONP(url,callback){
    let script = document.createElement('script')
    let functionName = `geylnu${parseInt(Math.random()*1000000)}`
    let param = '?callback='+functionName
    window[functionName] = callback
    script.src = url + param
    document.body.appendChild(script)

    script.onload = function (e){
        e.currentTarget.remove()
        delete window[functionName]
    }

    script.onerror = function (e){
        e.currentTarget.remove()
        delete window[functionName]
    }
}

JSONP('./test',function (z){
    money.innerText=z
})

draw.onclick = ()=>{JSONP('http://localhost:8666/test',function (z){
    money.innerText=z
})}