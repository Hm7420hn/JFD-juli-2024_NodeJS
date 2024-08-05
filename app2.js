const http = require('http')

let server = http.createServer(function(request,respon) {
    let nama = 'Hamadah Hilmi'
    let alamat = 'Duren Sawit, Jakarta Timur, 15480'
    let html = `<h1>Hai, nama saya ${nama}, saya tinggal di ${alamat}</h1>`
    respon.writeHead(200, {'Content-type': 'text / html'})
    respon.end(html)
})

server.listen(3000, function(){
    console.log('Server Sudah Siap, buka http://localhost:3000');
    
})