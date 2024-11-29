const { sql, poolPromise } = require('../config/db');

const getAllUsersDb = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM Users');
  return result.recordset;
};

const createUserDb = async ({ username, email, password, full_name = null }) => {
  try {
    const pool = await poolPromise;
    console.log("Inserting user into database:", { username, email, password, full_name });

    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .input('email', sql.VarChar, email)
      .input('password', sql.NVarChar, password)
      .input('full_name', sql.NVarChar, full_name)
      .query(`
        INSERT INTO Users (username, email, password, full_name) 
        VALUES (@username, @email, @password, @full_name);
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

module.exports = {
  getAllUsersDb,
  createUserDb,
  deleteUserByIdDb
};
