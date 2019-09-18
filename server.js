const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5600;
const Joi = require('@hapi/joi')


app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/resume', { useNewUrlParser: true }, (error) => {
    if (error) {
        console.log("error in connecting the database")
    } else {
        console.log("connection to the db is live")
    }
} )

app.get('/', (req, res) => {
    res.send("i am live")

})
const schema = require('./inputvalidation/register')

const Member = require('./model/db')

app.post('/contactus', (req, res) => {

    const data = req.body;
    Joi.validate(data, schema, async (error, result) => {
        if (error) {
            console.log(error)
            return res.status(400).json({ msg: "invalid credentials" })
        } 

        const { name, email, message } = data;

        try {
            let member = await Member.findOne({ email: data.email })
            console.log(member)
            if (member) {
                return res.status(400).json({ error: [{ msg: "user already exist" }] })

            }
            member = new Member({
                name,
                email,
                message
            })

           await member.save((err, doc) => {
                if (err) {
                    console.log("error in saving")
                } else {
                    console.log(result);

                    return res.status(200).json({
                        userdetails: doc,
                        msg: "you have succesfully registered"
                    });

                }
            });
            
        } catch (error) {
            console.error(error.message)
            res.status(500).json("Server Error")
            
        }
            
        

    })

    
   
})














app.listen(PORT, (error) => {
    if (error) {
        console.log("error in connection")
    } else {
        console.log(` port ${PORT} is connected`)
    }
})