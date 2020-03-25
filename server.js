const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 5001;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/streamers/random', (req, res) => {
    axios.get('http://localhost:8001/streamers/random')
        .then((result) => {
            res.status(200).json(result.data);
        })
        .catch(err =>  res.status(400).send(err))
});


app.get('/api/get', (req, res) => {
    axios.get('http://localhost:3000/api/get')
        .then((result) => {
            res.status(200).json(result.data);
        })
        .catch(err =>  res.status(400).send(err))
});

app.put('/streamers/:name', (req, res) => {
    const streamerName = req.params.name;
    const updateObject = req.body;
    
    axios.put(`http://localhost:8001/streamers/${streamerName}`, updateObject)
      .then((result) => {
        res.send(result.data);
      })
    console.log(`Updating follower count on ${streamerName} : `, updateObject.amount);
});

app.listen(port, () => console.log(`listening on port ${port}!`));
