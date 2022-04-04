const express = require('express')
const nodemailer = require("nodemailer")
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const corsOptions ={
    origin:'*', 
    credentials:true,          
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions))

let smtp_login = process.env.SMTP_LOGIN || '---'
let smtp_password = process.env.SMTP_PASSWORD || '---'
let port = process.env.PORT || 3010

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login,
        pass: smtp_password,
    },
});

app.get('/', function (req, res) {
    res.send('Hello World!')
})
app.post('/sendMessage', async function (req, res) {
    let { contacts, name, message } = req.body

    let info = await transporter.sendMail({
        from: 'My portfolio cv',
        to: "alexandev444@gmail.com",
        subject: "HR wants me",
        //text: "Text",
        html: `<b>Сообщение с вашего портфолио</b>
    <div>
       name:${name}
    </div>
    <div>
       message:${message}
    </div>`,
    });

    res.send('ok')
})



app.listen(port, function () {
    console.log(`Example app listening on port ${port}`)
}) 