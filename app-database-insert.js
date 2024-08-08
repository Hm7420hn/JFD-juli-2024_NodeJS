const { log } = require('console')
const http    = require('http') //model bawaan dari node.js
const mysql  = require('mysql2') //modul dari node_modules

// konfigurasi database mysql yg ingin digunakan
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jfd_belajar_database',
}) 

// menyambungkan atau membuka koneksi
db.connect()


let sql =
`INSERT INTO karyawan (nama, gender, alamat,nip) 
VALUES ('jokowi', 'L', 'solo','007');`

// memasukkan/menembahan data dari mysql
db.query( sql, (error, hasil)=> {
    if (error) {
        console.log(error);
    } else {
        // console.log(hasil);
        if (hasil.affectedRows > 0) {
            console.log('berhasil insert data karyawan');
        }   
    }
})

db.end()