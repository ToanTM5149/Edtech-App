const { sql, poolPromise } = require('../config/db');

const getAllUsersDb = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM Users');
  return result.recordset;
};

const createUserDb = async ({
  username,
  email,
  password,
  full_name,
  phone_number = null,
  profile_picture = null,
  interests = null,
  notifications_enabled = false
}) => {
  try {
    const pool = await poolPromise;
    console.log("Inserting user into database:", { username, email, password, full_name, phone_number, profile_picture, interests, notifications_enabled });

    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .input('email', sql.VarChar, email)
      .input('password', sql.NVarChar, password)
      .input('full_name', sql.NVarChar, full_name)
      .input('phone_number', sql.VarChar, phone_number)
      .input('profile_picture', sql.NVarChar, profile_picture)
      .input('interests', sql.NVarChar, interests) // JSON string
      .input('notifications_enabled', sql.Bit, notifications_enabled)
      .query(`
        INSERT INTO Users (username, email, password, full_name, phone_number, profile_picture, interests, notifications_enabled) 
        VALUES (@username, @email, @password, @full_name, @phone_number, @profile_picture, @interests, @notifications_enabled);
        SELECT * FROM Users WHERE user_id = SCOPE_IDENTITY();
      `);

    console.log("Query result:", result.recordset);
    return result.recordset[0];
  } catch (error) {
    console.error("Error executing query:", error);
    return null;
  }
};

const deleteUserByIdDb = async (user_id) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('user_id', sql.Int, user_id)
    .query('DELETE FROM Users WHERE user_id = @user_id; SELECT * FROM Users WHERE user_id = @user_id');
  return result.recordset[0];
};

const checkUserExists = async (username, email, phone_number) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('username', sql.NVarChar, username)
    .input('email', sql.VarChar, email)
    .input('phone_number', sql.VarChar, phone_number)
    .query(`
      SELECT 
        CASE 
          WHEN EXISTS (SELECT 1 FROM Users WHERE username = @username) THEN 'username'
          WHEN EXISTS (SELECT 1 FROM Users WHERE email = @email) THEN 'email'
          WHEN EXISTS (SELECT 1 FROM Users WHERE phone_number = @phone_number) THEN 'phone_number'
          ELSE NULL
        END as duplicate_field
    `);
  return result.recordset[0].duplicate_field;
};

const getUserByEmailDb = async (email) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('email', sql.VarChar, email)
    .query('SELECT * FROM Users WHERE email = @email');
  return result.recordset[0];
};

module.exports = {
  getAllUsersDb,
  createUserDb,
  deleteUserByIdDb,
  checkUserExists,
  getUserByEmailDb
};
