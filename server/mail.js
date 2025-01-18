import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendOTP = async (recipient, otp) => {
  const mailData = {
    from: process.env.MAIL_USER,
    to: recipient,
    subject: "Email verification for AIMS portal login",
    text: `${otp} is your OTP to login to your AIMS account.`,
  };

  try {
    await transport.sendMail(mailData, () => {
      console.log("OTP sent successfully");
      return res.status(200).json({ message: "OTP sent successfully" });
    });
  } catch (error) {
    console.log("Error sending OTP email: ", error);
  }
};

export { transport, sendOTP };
