import "dotenv/config";
import express from "express";
import cors from "cors";
import { sendOTP } from "./mail.js";
import { db } from "./db.js";
import otp_generator from "otp-generator";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.post("/send-otp", async (req, res) => {
  const { recipient } = req.body;

  const otp = otp_generator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  await sendOTP(recipient, otp);
});

app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
});
