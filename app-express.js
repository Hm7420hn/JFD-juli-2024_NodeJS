const express   = require('express')
const app       = express()
const port = 3000


app.get('/', (req, res)=>{
    res.send('Hello World!!')
})

// route -> rute
app.get('/hubungi', function(req, res) {
    res.send('<h1>Silahkan WA Saya: 081380175488</h1>')
})

app.listen(port,()=> {
    console.log('Server Sudah Siap, buka http://localhost:' + port);
    
})