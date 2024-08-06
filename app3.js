const http = require('http')
const fs = require('fs')


let server = http.createServer(function(request,respon) {
    if (request.url == '/') {
        respon.writeHead(200, {'Content-type': 'text / html'})
        respon.write('<h1>Halaman Beranda</h1>')
        respon.end()
    } else if (request.url == '/profil') {
        fs.createReadStream('./view/profil.html').pipe(respon)   
    }
    else if (request.url == `/berita`) {
        respon.writeHead(200, {'Content-type': 'text / html'})
        respon.write(
        `<h1>Barita terupdate dari kami:</h1><hr>
        Judul Berita 1:Lorem Ipsum bla bla bla <br>
        Judul Berita 2:Lorem Ipsum bla bla bla <br>
        Judul Berita 3:Lorem Ipsum bla bla bla <br>
        Judul Berita 4:Lorem Ipsum bla bla bla <br>
        `
        )
        respon.end
    }
    else {
    respon.writeHead(200, {'Content-type': 'text / html'})
    respon.write('<h1>404 Not found</h1>')
    respon.end()
    }
})

server.listen(3000, function(){
    console.log('Server Sudah Siap, buka http://localhost:3000');
    
})