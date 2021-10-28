const express = require('express');
const routes = require('./routes');

/*** 
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('db.sqlite', (err)=>{
    if(err){
        return console.error(err.message);
    }
    console.log('Conectado com sucesso!!!')
})
*/

const app = express();
app.use(express.json());

app.use(routes);
app.listen(3001);