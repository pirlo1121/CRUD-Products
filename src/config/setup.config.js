const { genSaltSync, hashSync } = require('bcrypt');
const UserModel = require('../models/user');

const createDefaultUsers = async () => {
    const salt = genSaltSync();
    const defaultPassword = 'Pirlo1121';

    try {
        const userCount = await UserModel.estimatedDocumentCount();

        if (userCount > 0) {
            return;
        }

        // Crea usuarios por defecto
        const defaultUser = {
            name: 'Maicol Bautista',
            username: 'pirlo@21.com',
            password: hashSync(defaultPassword, salt),
            role: 'superadmin'
        };

        const users = await UserModel.create([defaultUser]);

        console.log(users);

    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    createDefaultUsers
};
