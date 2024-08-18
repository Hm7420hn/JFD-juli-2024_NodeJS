const db = require('../config/database').db

module.exports =
{    
    get_semuaAgama: function() {
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

}