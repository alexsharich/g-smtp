const express = require('express')
const nodemailer = require("nodemailer")
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alexandev444@gmail.com',
        pass: 'alexanDev4445611918',
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

app.listen(3010, function () {
    console.log(`Example app listening on port 3010`)
}) 