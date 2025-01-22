import pg from "pg";

const { Pool } = pg;

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const storeOTP = async (email, otp) => {
  const query = `INSERT INTO otp (email, otp)
            VALUES ($1, $2)
            ON CONFLICT (email)
            DO UPDATE SET otp = $2
            RETURNING *;`;
  const values = [email, otp];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const getOTP = async (email) => {
  const query = `SELECT otp FROM otp WHERE email = $1;`;
  const values = [email];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log("Error getting OTP from database: ", error);
  }
};

const deleteOTP = async (email) => {
  const query = `DELETE FROM otp WHERE email = $1;`;
  const values = [email];

  try {
    await db.query(query, values);
  } catch (error) {
    console.log("Error deleting OTP from database: ", error);
  }
};

export { storeOTP, getOTP, deleteOTP };
