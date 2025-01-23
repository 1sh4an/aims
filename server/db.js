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

const addStudent = async (name, email, entryNumber, batch, department) => {
  try {
    const user = await db.query(
      "INSERT INTO users (user_name, email, department_code) VALUES ($1, $2, $3) RETURNING *",
      [name, email, department]
    );

    const student = await db.query(
      "INSERT INTO students (user_id, student_entry_no, batch) VALUES ($1, $2, $3) RETURNING *",
      [user.rows[0].user_id, entryNumber.toUpperCase(), batch]
    );
  } catch (error) {
    console.log("Error adding student", error);
  }
};

const addFaculty = async (name, email, facultyAdvisor, department) => {
  try {
    const user = await db.query(
      "INSERT INTO users (user_name, email, department_code) VALUES ($1, $2, $3) RETURNING *",
      [name, email, department]
    );

    const faculty = await db.query(
      "INSERT INTO faculty (user_id) VALUES ($1) RETURNING *",
      [user.rows[0].user_id]
    );

    if (facultyAdvisor == "true") {
      const advisor = await db.query(
        "INSERT INTO advisors (department_code, faculty_id) VALUES ($1, $2) RETURNING *",
        [department, faculty.rows[0].faculty_id]
      );
    }
  } catch (error) {
    console.log("Error adding faculty", error);
  }
};

export { db, storeOTP, getOTP, deleteOTP, addStudent, addFaculty };
