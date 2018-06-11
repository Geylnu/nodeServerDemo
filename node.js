var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var path = request.url
    var query = ''
    if (path.indexOf('?') >= 0) { query = path.substring(path.indexOf('?')) }
    var pathNoQuery = parsedUrl.pathname
    var queryObject = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/
    console.log(`参数分别为${path}\t${pathNoQuery}\t${query}`)
    if (path == '/') {
        response.statusCode = 302
        response.setHeader('Location', '/index.html')
        response.end()
    } else if (path == '/style.css') {
        var string = fs.readFileSync('./style.css', 'utf8')
        response.setHeader('Content-Type', 'text/css; charset=utf-8')
        response.write(string)
        response.end()
    } else if (path == '/main.js') {
        var string = fs.readFileSync('./main.js', 'utf8')
        response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
        response.write(string)
        response.end()
    } else if (path == '/index.html') {
        var string = fs.readFileSync('./index.html', 'utf8')
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.write(string)
        response.end()
    } else if (pathNoQuery == '/test') {
        callback = query.substring(query.indexOf('=')+1)
        response.setHeader("Content-Type", "text/javascript; charset=utf-8")
        var callbackParam = fs.readFileSync('./test.db','utf8')
        callbackParam--
        response.write(`${callback}(\'${callbackParam}\')`)
        response.end()
        fs.writeFileSync('./test.db',callbackParam,'utf8')
    } else {
        response.statusCode = 404
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)