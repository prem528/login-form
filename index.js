const express = require('express');
const mongoose = require('mongoose');
const bodyParsser = require('body-parser');
const dotenv = require('dotenv');
const { MongoGCPError } = require('mongodb');
const bodyParser = require('body-parser');


const app = express();
dotenv.config();

const port = process.env.PORT|| 3000;

mongoose.connect("mongodb+srv://prem05082002:XGj31GCMutbcUA9H@cluster0.6kwrbfv.mongodb.net/registrationFormData", {
    useNewUrlParser: true,
    useUnifiedTopology : true,
});

const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const Registration = mongoose.model("Registration" , registrationSchema );

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/index.html');
});

app.post('/register', async (req, res) => {
     try{
        const {name, email, password } = req.body;

        const existingUser =  await Registration.findOne({email: email})
        if(!existingUser) {
            const registrationData = new Registration({
            name, 
            email,
            password
        });
         await registrationData.save();
         res.redirect("/success");
        }
        else {
            console.log("user already exist")
            res.redirect("/error")
            
        } 

        
     }
     catch (error) {
        console.log(error)
        res.redirect("/error")

     }
})

app.get("/success", (req, res) => {
    res.sendFile(__dirname + "/pages/success.html")
});

app.get("/error", (req, res) => {
    res.sendFile(__dirname + "/pages/error.html")
});

app.listen(port , () => {
    console.log(`server is listening on port ${port}`)
})




 