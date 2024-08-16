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

// Untuk mengambil data yg ter-encoded (enkripsi) dari form html
// yang dikirimkan melalui protokol http
app.use(express.urlencoded({extended:false}) )  
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
        karyawan: await get_semuakaryawan(),
        message: req.query.msg,
    }
    res.render('karyawan/index', dataview)
})


app.get('/karyawan/detail/:id_karyawan', async (req,res)=> {

    // ambil id yang dikirim via url  
    let idk = req.params.id_karyawan

    // setelah itu kirim ke proses request data mysql
    let dataview = {
        pegawai: await get_satuKaryawan(idk),
    }
    res.render('karyawan/detail', dataview)
})

function get_satuKaryawan(idk) {
    let sql = 
    `SELECT
	    karyawan.*,
	    department.kode AS kode_dept, department.nama AS nama_dept,
        agama.nama AS nama_agama  
    FROM karyawan
    LEFT JOIN department    ON department.id = karyawan.departmen_id
    LEFT JOIN agama         ON agama.id = karyawan.agama_id
    WHERE karyawan.id = ?`

    return new Promise( function(resolve, reject) {
         db.query(sql, [idk], function(errorsql, hasil) {
         if (errorsql) {
                reject(errorsql);
            } else {
                resolve(hasil)
            }
        })
    })
}


app.get('/karyawan/hapus/:id_karyawan', async (req,res)=> {
    // ambil id yang dikirim via url  
    let idk = req.params.id_karyawan

    // proses hapus data    
    try {
        let hapus = await hapus_satukaryawan(idk)
        if (hapus.affectedRows > 0) {
            res.redirect(`/karyawan?msg=berhasil hapus karyawan`)            
        }
    } catch (error) {
        throw error
    }
})

function hapus_satukaryawan(idk) {
    let sql = 
    `DELETE FROM karyawan
    WHERE id = ?`

    return new Promise( function(resolve, reject) {
        db.query(sql, [idk], (errorsql, hasil)=> {
        if (errorsql) {
               reject(errorsql);
           } else {
               resolve(hasil)
           }
       })
   })
}

app.get('/karyawan/tambah', async (req,res)=> {
    // ambil data departmen  dari database table departmen
let dataview ={
    dept: await get_semuaDepartmen(),
    agm: await get_semuaAgama(),
    }
    res.render('karyawan/form-tambah' , dataview)
})

function get_semuaDepartmen() {
    return new Promise( (resolve, reject)=> {
         db.query("SELECT * FROM department", (errorsql, hasil)=> {
         if (errorsql) {
                reject(errorsql);
            } else {
                resolve(hasil)
            }
        })
    })
}


function get_semuaAgama() {
    return new Promise( (resolve, reject)=> {
         db.query("SELECT * FROM agama", (errorsql, hasil)=> {
         if (errorsql) {
                reject(errorsql);
            } else {
                resolve(hasil)
            }
        })
    })
}

app.post('/karyawan/proses-insert', async function(req,res) {
    // terima kiriman  data dari form html
    // let body = req.body
    
    try {
        let insert = await insert_karyawan(req)
        if (insert.affectedRows > 0) {
            res.redirect('/karyawan')
        }
    } catch (error) {
        throw error
    }
})


function insert_karyawan(req) {
    let data = {
        nama            : req.body.form_nama_lengkap,
        gender          : req.body.form_gender,
        alamat          : req.body.form_alamat,
        nip             : req.body.form_nip,
        departmen_id    : req.body.form_departmen,
        agama_id        : req.body.form_agama
    }

    let sql =`INSERT INTO karyawan SET ?`;
   
    return new Promise( function(resolve, reject) {
        db.query(sql, [data], (errorsql, hasil)=> {
        if (errorsql) {
               reject(errorsql);
           } else {
               resolve(hasil)
           }
       })
   })
}

app.get('/karyawan/edit/:id_karyawan', async function (req,res) {
    let idk = req.params.id_karyawan
    let dataview ={
        dept    : await get_semuaDepartmen(),
        agm     : await get_semuaAgama(),
        Pegawai : await get_satuKaryawan(idk),
        }
        res.render('karyawan/form_edit', dataview)
})


app.post('/karyawan/proses-update/:id_karyawan', async function (req,res) {
    let idk = req.params.id_karyawan
    try {
        let update = await update_karyawan(req, idk)
        if (update.affectedRows > 0) {
            res.redirect(`/karyawan?msg=berhasil edit karyawan a/n ${req.body.form_nama_lengkap}`)
        }
    } catch (error) {
        throw error
    }
})

function update_karyawan(req, idk) {
        let data = {
            nama            : req.body.form_nama_lengkap,
            gender          : req.body.form_gender,
            alamat          : req.body.form_alamat,
            nip             : req.body.form_nip,
            departmen_id    : req.body.form_departmen,
            agama_id        : req.body.form_agama
        }

        let sql =`UPDATE karyawan SET ? WHERE id = ?`;
    
        return new Promise( (resolve, reject) => {
            db.query(sql, [data, idk], function(errorsql, hasil) {
            if (errorsql) {
                reject(errorsql);
            } else {
                resolve(hasil)
            }
        })
    }
)}

app.listen(port,()=> {
    console.log('Server Sudah Siap, buka http://localhost:' + port);
    
})