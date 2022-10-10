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

const corsOptions = {
    origin: "http:// ",
    optionsSuccessStatus: 200
};




app.listen(PORT, ()=>{
    console.log('Client-side server is listening on port: ', PORT);
})