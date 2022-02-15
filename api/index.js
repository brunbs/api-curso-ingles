const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
const port = 3000;

app.get('/test', (req, res) => {
    res.status(200).send({ message: 'Welcome' });
});

app.listen(port, () => {
    console.log(`API running on port ${port}`)
});

module.exports = app;