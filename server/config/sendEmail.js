import dotenv from "dotenv";
import { Resend } from "resend";
dotenv.config();

if (!process.env.RESEND_API) {
  throw new Error("Please provide RESEND_API in the .env file");
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "BlinkProject <noreply@mylexinfotech.com>", // Replace with an email address authorized by Resend
      to: sendTo,
      subject: subject,
      html: html,
    });

    if (error) {
      console.error("Email sending failed:", error);
      return null; // Handle the error as needed
    }

    return data;
  } catch (error) {
    console.error("Unexpected error in sendEmail:", error);
    return null; // Handle further if needed
  }
};

export default sendEmail;
