const { genSaltSync, hashSync } = require( 'bcrypt' );
const UserModel = require( '../models/user' );

function registerUser( newUser ) {
    // Creamos el usuario y encriptamos la contraseña antes de guardar
    const salt = genSaltSync();
    const hashedPassword = hashSync( newUser.password, salt );
    const dbUser = new UserModel({
        ...newUser,
        password: hashedPassword,
    });
    dbUser.save();
}

async function findUserByUsername( username ) {
    // Buscamos el usuario por nombre de usuario y excluimos algunas propiedades
    return await UserModel.findOne({ username }, {
        createdAt: 0,
        updatedAt: 0,
        __v: 0
    });
}

module.exports = {
    registerUser,
    findUserByUsername
};
