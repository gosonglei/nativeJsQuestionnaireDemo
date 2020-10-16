function myAjax(type, url, data = null, successFun, showConsole = false) {
    const xhr = new XMLHttpRequest()
    showConsole && console.log("body数据:", data)
    xhr.open(type, url)
    xhr.setRequestHeader("Content-type", "application/json")
    xhr.send(data)
    xhr.onload = e => {
        showConsole && console.log("请求成功")
        showConsole && console.log(xhr.status)
        showConsole && console.log(xhr.readyState)
        if (xhr.status === 200) {
            showConsole && console.log("success")
            showConsole && console.log(xhr.response)
            successFun(JSON.parse(xhr.response))
        } else {
            showConsole && console.log("fail")
        }
    }
    xhr.onerror = e => {
        showConsole && console.log(e)
    }
}