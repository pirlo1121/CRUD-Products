const { validateToken } = require('../helpers/jwt.helper');

const authUser = (req, res, next) => {
    try {
        // 1. Obtener el token del header y validar que existe
        const token = req.header('X-Token');
        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'Error al obtener el Token'
            });
        }

        // 2. Verificar que el token es auténtico (fue generado por nosotros)
        // 3. Extraer el username (email) y el _id (ID) para verificar que el usuario está registrado
        const payload = validateToken(token);

        // 4. Enviar el ID usuario al controlador para registrar
        req.authUser = payload;

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
};

module.exports = {
    authUser
};
