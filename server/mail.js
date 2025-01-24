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
    });
  } catch (error) {
    console.log("Error sending OTP email: ", error);
  }
};

const sendInstructorVerificationEmail = async (
  recipient,
  course_code,
  student_data
) => {
  const mailData = {
    from: process.env.MAIL_USER,
    to: recipient,
    subject: "AIMS: Instructor pproval request",
    html: ` <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">

        <p>You have a new approval request for a course enrollment. Please find the details below:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <th style="text-align: left; padding: 8px; background: #f9f9f9; border-bottom: 1px solid #ddd;">Course Code</th>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${course_code}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; background: #f9f9f9; border-bottom: 1px solid #ddd;">Student Name</th>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${student_data.user_name}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; background: #f9f9f9; border-bottom: 1px solid #ddd;">Student Department</th>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${student_data.department_code}</td>
          </tr>
        </table>
        <p style="margin-bottom:20px;">Please visit the AIMS portal to take action on this request</p>
        <p>If you have any questions, please contact the administration team.</p>
        <p style="color: #777; font-size: 0.9em;">Thank you,<br>The AIMS Team</p>
      </div>`,
  };

  try {
    await transport.sendMail(mailData, () => {
      console.log("Email successfully");
    });
  } catch (error) {
    console.log("Error sending email: ", error);
  }
};

export { transport, sendOTP, sendInstructorVerificationEmail };
