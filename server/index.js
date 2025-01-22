import "dotenv/config";
import express from "express";
import cors from "cors";
import { sendOTP } from "./mail.js";
import { storeOTP, getOTP, deleteOTP } from "./db.js";
import bcrypt from "bcrypt";
import otp_generator from "otp-generator";

const app = express();
const PORT = process.env.PORT;
const saltRounds = 10;

app.use(express.json());
app.use(cors());

app.post("/submit-login", async (req, res) => {
  const { recipient } = req.body;

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
          message: "Server error while sending OTP",
        });
      }

      await storeOTP(recipient, hashedOTP);

      return res.status(200).json({
        valid: true,
        message: "OTP sent successfully",
      });
    });
  } catch (error) {
    console.log("Error sending OTP: ", error);
    return res.status(500).json({
      message: "Server error while sending OTP",
    });
  }
});

app.post("/submit-signup", async (req, res) => {
  const { name, email, designation, department } = req.body;

  // TODO: check if user in database
  // if user exists, return 409

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
          message: "Server error while sending OTP",
        });
      }

      await storeOTP(email, hashedOTP);

      return res.status(200).json({
        valid: true,
        message: "OTP sent successfully",
      });
    });
  } catch (error) {
    console.log("Error sending OTP: ", error);
    return res.status(500).json({
      message: "Server error while sending OTP",
    });
  }
});

app.post("/delete-otp", async (req, res) => {
  const { email } = req.body;

  await deleteOTP(email);

  return res.status(200).json({
    message: "OTP deleted successfully",
  });
});

app.post("/verify-login", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
});
