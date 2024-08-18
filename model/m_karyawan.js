const db = require('../config/database').db

module.exports =
{


    get_semuakaryawan: function() {
        return new Promise( (resolve, reject)=> {
            db.query("SELECT * FROM karyawan", (errorsql, hasil)=> {
            if (errorsql) {
                    reject(errorsql);
                } else {
                    resolve(hasil)
                }
            })
        })
    },


    get_satuKaryawan: function(idk) {
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


    insert_karyawan: function (req) {
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
    },


    update_karyawan: function(req, idk) {
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
        })
    },


    hapus_satukaryawan: function(idk) {
        let sql = 
        `DELETE FROM karyawan
        WHERE id = ?`;

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

}
