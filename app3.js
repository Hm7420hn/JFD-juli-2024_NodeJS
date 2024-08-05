const http = require('http')

let server = http.createServer(function(request,respon) {
    if (request.url == '/') {
        respon.writeHead(200, {'Content-type': 'text / html'})
        respon.write('<h1>Halaman Beranda</h1>')
        respon.end()
    } else if (request.url == '/profil') {
        respon.writeHead(200, {'Content-type': 'text / html'})
        respon.write('<h1>Ini adalah profil saya:</h1>')
        respon.end()
    } else {
    respon.writeHead(200, {'Content-type': 'text / html'})
    respon.write('<h1>404 Not found</h1>')
    respon.end()
    }
})

server.listen(3000, function(){
    console.log('Server Sudah Siap, buka http://localhost:3000');
    
})