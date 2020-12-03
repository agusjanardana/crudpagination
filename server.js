var express = require('express')
var ejs = require('ejs')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var app = express()
var mainRoutes = require('./routes/main')
const path = require("path")
// app.use('views/public', express.static('public'))

mongoose.connect('mongodb://localhost:27017/article', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => console.log("mongoDB Connected"))
    .catch((err) => console.log(err));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static(path.join(__dirname, '/views/public'))) // iya file css nya udah ku delete, sama file ejs juga, kalau mau buat aja coba yg simple 
app.use("/", mainRoutes)
app.set('view engine', 'ejs')

app.listen(8080, function () {
    console.log('Node.js listening on port ' + 8080)
})