const path = require('path');
const express = require('express');
const routes = require('./backend/routes');
const bodyParser = require('body-parser');
const app = express();

console.log('get served!');

// This line makes the build folder publicly available.
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/index.html'); // For React/Redux
});

app.use(bodyParser.json());
app.use('/db', routes);

app.listen(3000, () => {
  console.log('Server for OVO App listening on port 3000!')
});
