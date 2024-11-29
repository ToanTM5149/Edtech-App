const {
    createUserDb,
    getAllUsersDb,
    deleteUserByIdDb,
} = require('../db/users.db');

class UserService {
    createUser = async (user) => {
        try {
            return await createUserDb(user);
        } catch (error) {
            throw new Error(error.message);
        }
    };

    getAllUser = async () => {
        try {
            return await getAllUsersDb();
        } catch (error) {
            throw new Error(error.message);
        }
    };

    deleteUserById = async (user_id) => {
        try {
            return await deleteUserByIdDb(user_id);
        } catch (error) {
            throw new Error(error.message);
        }
    };
}

module.exports = new UserService();