const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8002;
const { Client } = require('pg');
const config = require('./config.json')[process.env.NODE_ENV || "dev"];
const client = new Client ({
    connectionString: config.connectionString,
})
client.connect();

app.use(express.json());
app.use(cors());

// const corsOptions = {
//     origin: "http:// ",
//     optionsSuccessStatus: 200
// };

app.get('/events/october', (req, res)=>{
    client.query('SELECT * FROM october_events')
    .then(result =>{
        res.send(result.rows);
    })
});

app.get('/events/october/:type', (req, res)=>{
    let type = req.params.type;
    let month = req.params.month;
        client.query('SELECT * FROM october_events WHERE event_type=$1', [type])
    .then(result => {
        res.send(result.rows);
    })
    
})

app.use((req, res, next)=>{
    res.status(404).send('Not found')
});
app.listen(PORT, ()=>{
    console.log('Client-side server is listening on port: ', PORT);
})