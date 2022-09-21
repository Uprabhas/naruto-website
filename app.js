const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/contactdance', { useNewUrlParser: true })
const port = 300;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var contact = mongoose.model('contact', contactSchema);


app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(300).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(300).render('contact.pug', params);
})

app.get('/about', (req, res) => {
    const params = {}
    res.status(300).render('about.pug', params);
})


app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("this item is saved")
    }).catch(() => {
        res.status(100).send("not saved")
    })

})

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});