const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const nodemaile = require("nodemailer");
const crd = require("./credn");
const path = require("path");
const hbs = require("hbs");

const port = process.env.PORT || 3000;




app.use(express.static("public"));
app.set("view engine", "hbs")



app.get("/", (req, res) => {
    res.render("index");
});




app.get("/send", (req, res) => {
    let email1 = req.query.email1;
    let email2 = req.query.email2;
    let subject = req.query.subject;
    let message = req.query.message


    const mail = nodemaile.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        
        
        auth: {
            user: crd.user,
            pass: crd.pass}
    });


    mail.sendMail({
        from: "durgasaini7976@gmail.com",
        to:[email1,email2],
        subject:subject,
        html:message
    }, (err)=>{
        if(err) throw err;
        res.send("mail has been sent")
    });

});


app.listen(port, () => {
    console.log(`connect live server ${port}`);
});

