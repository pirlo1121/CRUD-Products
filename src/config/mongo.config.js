const mongoose = require( 'mongoose' );

const dbConection = async() =>{
    try {
        await mongoose.connect( process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        
    } catch ( error ) {
        console.error( erro )
        throw new Error( 'Error al iniciar la base de datos');

        
    }
}

module.exports = { dbConection};