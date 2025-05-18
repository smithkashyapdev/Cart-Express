import twilio from 'twilio';
import nodemailer from 'nodemailer';

console.log('TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID);
console.log('TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN);

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const testAccount = nodemailer.createTestAccount();

console.log('testAccount:', testAccount);
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Mock send
export const sendOtpToMobile = async (message: string, mobile: string, otp: string): Promise<string> => {
  try {
    const msg = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobile,
    });


    console.log(`✅ SMS sent to ${mobile}. SID: ${msg.sid}`);
    return msg.to;
  } catch (error) {
    console.error(`❌ Failed to send SMS to ${mobile}:`, error);
    throw error;
  }
};

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {

    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    const info = await transporter.sendMail({
      from: `"Flipkart Clone" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    });

    console.log(`✅ Email sent to ${to}. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error);
    throw error;
  }
};
