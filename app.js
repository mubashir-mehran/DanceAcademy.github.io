const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

const port = 8000;


//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });
  const contact = mongoose.model('Contact', contactSchema);

//express stuff
app.use('/static', express.static('static')) //for serving static files
app.use(express.urlencoded())

//pugstuff
app.set('view engine', 'pug') // set the template engine as pug
app.set('views', path.join(__dirname,'views')) // set the views directory

//Endpoints
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug');
})
app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This data has been save into database")
    }).catch(()=>{
        res.status(400).send("Item was not saved into database")

    });
   // res.status(200).render('contact.pug', params);
})
//Start the server 
app.listen(port, ()=>{
    console.log(`The application has been started successfully on port ${port}`);
});
