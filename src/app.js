require( 'dotenv' ).config();

const express = require( 'express' );
const { dbConection } = require( './config/mongo.config.js')
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use( cors() );
app.use( express.json() );

// app.use( '', require(''));

dbConection();



app.listen( PORT, ()=>{
    console.log(` servidor lanzado en http:localhost: ${PORT} `);
})

