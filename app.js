const http = require('http')



let Server = http.createServer(function (request, respon){
    // mendetaksi status http 200 (user berhasil terkoneksi dengan aplikasi kita)
    // Content-type apa type konten yg ingin diberikan ke user
    // text/html akan merender tag html menjadi tempilan di browser/google 
    respon.writeHead(200, {'Cotent-type': 'text/html'})
    // hasil akhir yg akan diberikan ke user
    respon.end('<h1>Halo guys!, Saya Mada</h1>')
})
Server.listen(3000, function () {
    console.log('Server sudah siap, buka http://localhost:3000');
})
