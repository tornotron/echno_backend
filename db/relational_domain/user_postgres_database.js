import { pool } from "../database.js";

async function PuserFindDuplicate(userName) {
  try {
    const status = await pool.query(
      `SELECT EXISTS (SELECT 1 FROM users WHERE user_name = $1)`,
      [userName],
    );
    return status.rows[0].exists;
  } catch (error) {
    console.error("Error finding duplicate users", error);
  }
}

async function PuserCreate(user) {
  try {
    await pool.query(
      `INSERT INTO users (user_name, salt, passhash) VALUES ($1, $2, $3)`,
      [user.username, user.salt, user.password],
    );
    return true;
  } catch (error) {
    console.error("Error createing user", error);
  }
}

export { PuserFindDuplicate, PuserCreate };
