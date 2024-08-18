const db = require('../config/database').db

module.exports =
{
    get_semuaDepartmen: function() {
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
}