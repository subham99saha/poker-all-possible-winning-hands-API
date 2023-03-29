const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors())

const routes = [
    { path: "/", obj: require('./routes/docsRoute') },
    { path: "/hands", obj: require('./routes/handsRoute') },
];
routes.forEach(rObj => {
    app.use(rObj.path, rObj.obj);
});


app.get('/test', (req, res) => {
  res.send('Successful response.');  
});

app.listen(4000, () => console.log('Poker app is listening on port 4000.'));