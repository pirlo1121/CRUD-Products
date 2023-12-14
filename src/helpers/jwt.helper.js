const { sign, verify } = require("jsonwebtoken");

const generateToken = (payload) => {
    const token = sign(
        payload,
        process.env.SECRET_JWT_SEED,
        { expiresIn: '1h' }
    );
    return token;
};

const validateToken = (token) => {
    try {
        const payload = verify(token, process.env.SECRET_JWT_SEED);
        return payload;
    } catch (error) {
        console.error(error);
        throw new Error('Token no válido');
    }
};

module.exports = {
    generateToken,
    validateToken
};
