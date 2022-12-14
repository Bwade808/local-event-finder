const express = require('express');
const app = express();
const cors = require('cors');
const { Client } = require('pg');
const config = require('./config.js')[process.env.NODE_ENV || "dev"];
const PORT = config.port;
const client = new Client ({
    connectionString: config.connectionString,
})
client.connect();

app.use(express.json());
app.use(cors());
// const corsOptions = {
//     origin: "https://phoenix-event-finder.onrender.com/",
//     optionsSuccessStatus: 200
// };

//SEARCH ALL ROUTE
app.get('/events/october', (req, res)=>{
    client.query('SELECT * FROM october_events')
    .then(result =>{
        res.send(result.rows);
    })
    .catch(err => {
        console.log(err);
    })
});

//SEARCH QUERY ROUTE
app.get('/events/october/:type', (req, res)=>{
    let type = req.params.type;
    // let month = req.params.month;
        client.query('SELECT * FROM october_events WHERE event_type=$1', [type])
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(err);
        })
});

//POST NEW EVENT ROUTE
app.post('/events/october', (req, res) => {
    let newEvent = req.body;
    // let month = req.params.month;
    client.query('INSERT INTO october_events (event_name, event_type, month_day) VALUES ($1, $2, $3)', 
    [newEvent.event_name, newEvent.event_type, newEvent.month_day])
    .then(result => {
        res.send(result.rows)
    })
    .catch(err => {
        console.log(err);
    })
});

//DELETE EVENT ROUTE
app.delete('/events/october/:id', (req, res) => {
    let eventId = req.params.id;
    console.log(eventId);
    client.query('DELETE FROM october_events WHERE event_id=$1', [eventId])
    .then(result => {
        res.send(result.rows)
    })
    .catch(err => {
        console.log(err);
    })
});

//Catch all 404 error handler
app.use((req, res, next)=>{
    res.status(404).send('Not found')
});
app.listen(PORT, ()=>{
    console.log('Client-side server is listening on port: ', PORT);
})