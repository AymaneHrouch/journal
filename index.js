const express = require("express")
const app = express();
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/dumb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB ... "))
    .catch(err => console.log("Error", err));

const Journal = mongoose.model('Journal', mongoose.Schema({
    text: String,
    date: Date
}))

async function createJournal(text) {
    let journal = new Journal({
        text: text,
        date: Date()
    })
    journal = await journal.save()
    console.log("check db")
}
const html = 
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Write Diaries</title>
</head>
<body>
    <form action="/save" method="post">
    <textarea name="text" cols="30" rows="10"></textarea>
    <input type="submit" value="Save">
    </form>
</body>
</html>`


app.get('/', (req, res) => {
    res.send(html)
})

app.post('/save', async (req, res) => {
    let journal = new Journal({
        text: req.body.text,
        date: Date()
    })
    journal = await journal.save()
    res.send(`Saved!<a href="http://localhost:3000"><br />Go back!!!</a>`)
})

app.listen(3000, () => console.log("Listening in port 3000 ... "))