const http = require('http')
const fs = require('fs')
const URL = require('url')
const qs = require('querystring')
const mysql = require('mysql2')


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jfd_belajar_database',
}) 

db.connect()


let server = http.createServer(function(request,respon) {

    // console.log(qs.parse(URL.parse(request.url)))
    let qstring = qs.parse(URL.parse(request.url).query)
    console.log(qstring.nama);
    if (qstring.nama) {
        db.query(`SELECT * FROM karyawan WHERE nama = ?`, [qstring.nama],(error, hasil)=>{
            if (error) {
                console.log(error);
            } else {
                return respon.write(
                    `<pr>
                    ${JSON.stringify(hasil)}
                    </pr>`
                )
            }
        } )
    }

    if (request.url == '/') {
        respon.writeHead(200, {'Content-type': 'text/html'})
        fs.createReadStream('./view/beranda.html').pipe(respon)
    } 
    else if (request.url == '/karyawan') {
        respon.writeHead(200, {'Content-type': 'text/html'})
        // proses pengambilan dari data  dari mysql
        db.query("SELECT * FROM karyawan", (error, hasil)=> {
            if (error) {
                console.log(error);
            } else {
                // buat variable kosong 
                let datakry = ''
                for (let i = 0; i < hasil.length; i++) {
                    // isi variable kosong dengan loopingan data dari db
                    datakry += hasil[i].nama + ' - ' + hasil[i].gender + ' - ' + hasil[i].alamat + ' - ' + hasil[i].nip + '<br>'
                }      
                // kirim ke frontend menggunakan respon manual 
                // karena fs.creatReadStream tidak mampu menerima kiriman data dari backend
                respon.write(
                    `<h1>Berita terupdate dari kami:</h1><hr>
                    ${datakry}`
                ) 
            }
        })

    }
    else {
        respon.writeHead(200, {'Content-type': 'text/html'})
        fs.createReadStream('./view/error404.html').pipe(respon)
    }
})


server.listen(3000, function(){
    console.log('Server Sudah Siap, buka http://localhost:3000');
})