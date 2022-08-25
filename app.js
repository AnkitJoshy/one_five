const express = require("express");
var db = require('./config/connection')
const app = express()
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server ${PORT}`));
var bodyParser = require('body-parser');




app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/form.html');
});
app.post('/submit', (req, res) => {
    console.log(req.body)


    return new Promise(async(resolve, reject) => {

        db.getDb().collection('contacts').insertOne(req.body).then((data) => {
            // console.log(data);
            console.log(data)
        })

        res.redirect('/thanks')



    })
})


app.post('/form', (req, res) => {
    console.log(req.body)
    return new Promise(async(resolve, reject) => {

        db.getDb().collection('form').insertOne(req.body).then((data) => {
            // console.log(data);
            console.log(data)
        })
        res.redirect('/thanks')
    })

})

app.get('/thanks', (req, res) => {
    res.sendFile(__dirname + '/formout.html');
})

db.connect((err) => {
    if (err)
        console.log('error' + err);
    else
        console.log("Database connected to port 27017");
})