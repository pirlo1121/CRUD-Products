require( 'dotenv' ).config();

const express = require( 'express' );
const { dbConection } = require( './config/mongo.config.js')
const cors = require('cors');
const { createDefaultUsers } = require('./config/setup.config.js');
const app = express();

const PORT = process.env.PORT || 3000;

app.use( cors() );
app.use( express.json() );

app.use( '/api/products', require('./routes/products.routes.js'));
app.use( '/api/auth', require( './routes/auth.routes'));

dbConection();
createDefaultUsers();



app.listen( PORT, ()=>{
    console.log(` servidor lanzado en http:localhost: ${PORT} `);
})

