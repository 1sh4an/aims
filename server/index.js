import "dotenv/config";
import express from "express";
import cors from "cors";
import { sendOTP } from "./mail.js";
import {
  db,
  storeOTP,
  getOTP,
  deleteOTP,
  addStudent,
  addFaculty,
} from "./db.js";
import bcrypt from "bcrypt";
import otp_generator from "otp-generator";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
const PORT = process.env.PORT;
const saltRounds = 10;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.post("/submit-login", async (req, res) => {
  const { recipient } = req.body;

  const user = await db.query("SELECT * FROM users WHERE email = $1", [
    recipient,
  ]);

  if (user.rows.length > 0) {
    const otp = otp_generator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    try {
      await sendOTP(recipient, otp);
      bcrypt.hash(otp, saltRounds, async (err, hashedOTP) => {
        if (err) {
          console.log("Error hashing OTP: ", err);
          return res.status(500).json({
            valid: false,
            message: "Server error while sending OTP",
          });
        }

        await storeOTP(recipient, hashedOTP);

        setTimeout(() => {
          deleteOTP(recipient);
          console.log(`OTP for ${recipient} deleted after 2 minutes`);
        }, 2 * 60 * 1000);

        return res.status(200).json({
          valid: true,
          message: "OTP sent successfully",
        });
      });
    } catch (error) {
      console.log("Error sending OTP: ", error);
      return res.status(500).json({
        valid: false,
        message: "Server error while sending OTP",
      });
    }
  } else {
    return res.status(200).json({
      valid: false,
      message: "User not found. Please sign up first",
    });
  }
});

app.post("/submit-signup", async (req, res) => {
  const { email } = req.body;

  const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

  if (user.rows.length > 0) {
    return res.status(200).json({
      valid: false,
      message: "User already exists. Please login instead.",
    });
  } else {
    const otp = otp_generator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    try {
      await sendOTP(email, otp);
      bcrypt.hash(otp, saltRounds, async (err, hashedOTP) => {
        if (err) {
          console.log("Error hashing OTP: ", err);
          return res.status(500).json({
            valid: false,
            message: "Server error while sending OTP",
          });
        }

        await storeOTP(email, hashedOTP);

        setTimeout(() => {
          deleteOTP(email);
          console.log(`OTP for ${email} deleted after 2 minutes`);
        }, 2 * 60 * 1000);

        return res.status(200).json({
          valid: true,
          message: "OTP sent successfully",
        });
      });
    } catch (error) {
      console.log("Error sending OTP: ", error);
      return res.status(500).json({
        valid: false,
        message: "Server error while sending OTP",
      });
    }
  }
});

app.post("/delete-otp", async (req, res) => {
  const { email } = req.body;

  await deleteOTP(email);

  return res.status(200).json({
    message: "OTP deleted successfully",
  });
});

app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  const hashedOTP = await getOTP(email);

  if (!hashedOTP) {
    return res.status(404).json({
      message: "OTP not found",
    });
  }

  bcrypt.compare(otp, hashedOTP.otp, async (err, result) => {
    if (err) {
      console.log("Error comparing OTP: ", err);
      return res.status(500).json({
        message: "Server error while comparing OTP",
      });
    }

    if (result) {
      await deleteOTP(email);
      return res.status(200).json({
        valid: true,
        message: "OTP verified successfully",
      });
    }

    return res.status(200).json({
      valid: false,
      message: "Invalid OTP",
    });
  });
});

app.post("/signup-student", async (req, res) => {
  const { name, email, entryNumber, batch, department } = req.body;
  await addStudent(name, email, entryNumber, batch, department);

  return res.status(200).json({
    valid: true,
    message: "Student signed up successfully",
  });
});

app.post("/signup-faculty", async (req, res) => {
  const { name, email, facultyAdvisor, department } = req.body;
  await addFaculty(name, email, facultyAdvisor, department);

  return res.status(200).json({
    valid: true,
    message: "Faculty signed up successfully",
  });
});

app.post("/login", async (req, res) => {
  const { email } = req.body;

  const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

  if (user.rows.length > 0) {
    req.session.user = user.rows[0];
    return res.status(200).json({
      valid: true,
      user: user.rows[0],
      message: "User logged in successfully",
    });
  } else {
    return res.status(400).json({
      valid: false,
      message: "User not found",
    });
  }
});

app.get("/session", (req, res) => {
  if (req.session.user) {
    return res
      .status(200)
      .json({ valid: true, user: req.session.user, message: "User logged in" });
  } else {
    return res
      .status(204)
      .json({ valid: false, message: "No user logged in." });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid"); // Clear session cookie
    res.status(200).json({ message: "Logged out successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
});
