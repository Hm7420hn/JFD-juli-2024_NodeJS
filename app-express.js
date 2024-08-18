const express   = require('express')
const app       = express()
const port      = 3000
const mysql     = require('mysql2')


// Untuk mengambil data yg ter-encoded (enkripsi) dari form html
// yang dikirimkan melalui protokol http
app.use(express.urlencoded({extended:false}) )  
app.set('view engine', 'ejs')   //setting penggunaan template engine untuk express
app.set('views', './view-ejs')   //setting penggunaan folder untuk menyempan file .ejs


// include masing-masing model
const m_karyawan    = require('./model/m_karyawan')
const m_departmen   = require('./model/m_departemen')
const m_agama       = require('./model/m_agama')

// include masing-masing controller
const c_karyawan = require('./controller/c_karyawan')

app.get('/', (req, res)=>{
    res.send('<h1>Hello World!!</h1>')
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
})

app.get('/karyawan', c_karyawan.index)
app.get('/karyawan/detail/:id_karyawan', c_karyawan.detail)
app.get('/karyawan/hapus/:id_karyawan', c_karyawan.hapus)
app.get('/karyawan/tambah/', c_karyawan.tambah)
app.get('/karyawan/proses-insert', c_karyawan.proses_insert)
app.get('/karyawan/edit/:id_karyawan', c_karyawan.edit)
app.get('/karyawan/proses-update/:id_karyawan', c_karyawan.proses_update)

app.listen(port,()=> {
    console.log('Server Sudah Siap, buka http://localhost:' + port);
    
})