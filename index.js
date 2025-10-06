const express = require('express');
const cors = require('cors');
const app = express();
const rateLimit = require('express-rate-limit');

const maxLimit = rateLimit({
    windowMs: 60 * 1000,
    max: 25,
    message: "Request limit exceeded"
});

app.use(cors());
app.use(express.json());
app.use(maxLimit);
app.set('trust proxy', 1);

const port = process.env.port || 8080;

let clipText = "";

app.get('/', (req, res) => {
    try{
        res.status(200).send(clipText);
        console.log("Read from Clipboard!");
    }catch(e){
        res.status(500).send("An error occured while reading text from clipboard.")
        console.log(e);
    }
});

app.post('/', (req, res) => {
    try{
        clipText = req.body.text;
        res.status(200).send("Text Written to Clipboard!");
        console.log("Write to Clipboard");
    }catch(e){
        res.status(500).send("An error occured while writting text to clipboard.");
        console.log(e);
    }
});

app.listen(port, () => {
    console.log(`Server is up and running at PORT: ${port}`);
});
