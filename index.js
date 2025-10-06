const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

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
