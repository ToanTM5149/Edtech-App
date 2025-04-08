const {
    createUserDb,
    getAllUsersDb,
    deleteUserByIdDb,
    checkUserExists,
    getUserByEmailDb,
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


    checkUserExists = async (username, email, phone_number) => {
        try {
            return await checkUserExists(username, email, phone_number);
        } catch (error) {
            throw new Error(error.message);
        }
    };

    getUserByEmail = async (email) => {
        try {
            return await getUserByEmailDb(email);
        } catch (error) {
            throw new Error(error.message);
        }
    };
}

module.exports = new UserService();