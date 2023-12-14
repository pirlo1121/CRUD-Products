const { compareSync } = require("bcrypt");
const UserModel = require("../models/user");
const { findUserByUsername, registerUser } = require('../services/auth.service');
const { generateToken } = require("../helpers/jwt.helper");

const register = async ( req, res ) => {
    console.log('REGISTRANDO...');

    const { username } = req.body;

    const userFound = await findUserByUsername( username );

    if ( userFound ) {
        return res.status( 200 ).json({
            ok: false,
            msg: 'El usuario ya existe!'
        });
    }

    registerUser( req.body );

    res.status( 201 ).json({
        ok: true,
        msg: 'Usuario registrado exitosamente'
    });
};

const login = async ( req, res ) => {
    const { username, password } = req.body;

    const userFound = await findUserByUsername( username );

    if (!userFound) {
        return res.status( 400 ).json({
            ok: false,
            msg: 'El usuario no existe! Por favor regístrese.'
        });
    }

    const isValidPassword = compareSync( password, userFound.password );

    if ( !isValidPassword ) {
        return res.status( 400 ).json({
            ok: false,
            msg: 'Contraseña inválida'
        });
    }

    const userData = { ...userFound.toObject() };
    delete userData.password;

    const payload = { ...userData };
    const token = generateToken( payload );

    res.status( 200 ).json({
        ok: true,
        token
    });
};

const renewToken = async ( req, res ) => {
    const { id } = req.authUser;

    try {
        const userFound = await UserModel.findById( id );

        if ( !userFound ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'El usuario no existe, no se puede renovar el token'
            });
        }

        const newToken = generateToken({ ...userFound.toObject() });

        res.status(200).json({
            ok: true,
            token: newToken,
            userData: { ...userFound.toObject(), password: undefined }
        });
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al renovar el token'
        });
    }
};

module.exports = {
    login,
    register,
    renewToken
};
