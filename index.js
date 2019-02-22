var express = require('express')
var app = express()
const port = 3000

//app.get('/', (req, res) => { res.send('hello world') })
app.use(express.static('public'))
app.use('/js', express.static('node_modules/three/build'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))