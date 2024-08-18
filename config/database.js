const mysql = require ('mysql2')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jfd_belajar_database',
}) 
db.connect()


function ekseskusi(script_sql) {
    return new Promise( (resolve, reject)=> {
         db.query(script_sql, (errorsql, hasil)=> {
         if (errorsql) {
                reject(errorsql);
            } else {
                resolve(hasil)
            }
        })
    })
}

module.exports = {
    db, ekseskusi
}