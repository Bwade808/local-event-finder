const express = require('express');
const app = express();
const PORT = 8001;

app.use(express.static('public'));


app.listen(PORT, ()=>{
    console.log('Client-side server is listening on port: ', PORT);
})