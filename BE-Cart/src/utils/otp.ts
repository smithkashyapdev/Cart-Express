export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Mock send
export const sendOtpToMobile = async (mobile: string, otp: string): Promise<void> => {
  console.log(`Sending OTP ${otp} to mobile ${mobile}`);
  // Replace this with Twilio, MSG91, Fast2SMS, etc.
};
