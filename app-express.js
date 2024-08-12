const express   = require('express')
const app       = express()
const port      = 3000
const mysql     = require('mysql2')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jfd_belajar_database',
}) 

db.connect()


app.set('view engine', 'ejs')   //setting penggunaan template engine untuk express
app.set('views', './view-ejs')   //setting penggunaan folder untuk menyempan file .ejs



app.get('/', (req, res)=>{
    res.send('Hello World!!')
})

// route -> rute
app.get('/hubungi', function(req, res) {
    let data = {
        Email: 'moodyhamoody74@gmail.com',
        Instagram: '7amoody7mh'
    }
    res.render('hubungi-developer', data)
    // res.send('<h1>Silahkan WA Saya: 081380175488</h1>')
})

app.get('/profil', (req, res)=> {
    let data = {
        jabatan: 'Senior Programmer',
        gender:  'Laki',
        gaji: 8000000
    }
    res.render('profil-developer', data)
    // error, karena express tidak bisa membaca file dengan extensi . html
    // res.send(require('./view/profil.html'))  
})


// proses pengambilan data dari mysql
function get_semuakaryawan() {
    return new Promise( (resolve, reject)=> {
         db.query("SELECT * FROM karyawan", (errorsql, hasil)=> {
         if (errorsql) {
                reject(errorsql);
            } else {
                resolve(hasil)
            }
        })
    })
}
        
    
    
// gunakan async await, untuk memaksa node js
// menunggu script yg dipanggil sampai selasai di ekseskusi
app.get('/karyawan', async function(req, res) { 
    let dataview = {
        karyawan: await get_semuakaryawan()
    }
    res.render('karyawan/index', dataview)
})


app.listen(port,()=> {
    console.log('Server Sudah Siap, buka http://localhost:' + port);
    
})