import User from "../models/user.model";
import Otp from "../models/otp.modal";
import { sendMail } from "../utils/user.mailer";
import { otpVerifiedTemplate, sendOtpTempletes } from "../config/email.templetes";

export const sendOtpService = async (email: string): Promise<number> => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const err: any = new Error("User not found");
    err.status = 404;
    throw err;
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expireAt = new Date(Date.now() + 60 * 1000); // 1 minute expiry

  // Check existing OTP for user
  let existingOtpEntry = await Otp.findOne({ where: { userId: user.id } });

  if (existingOtpEntry) {
    existingOtpEntry.otp = otp;
    existingOtpEntry.expireAt = expireAt;
    await existingOtpEntry.save();
  } else {
    await Otp.create({
      userId: user.id,
      otp,
      expireAt,
    });
  }

  const messageTemplate = sendOtpTempletes(otp.toString());
  await sendMail(email, "OTP Verification Code", messageTemplate);

  return otp;
};

export const verifyOtpService = async (email: string, otp: string | number): Promise<void> => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const err: any = new Error("User not found");
    err.status = 404;
    throw err;
  }

  const otpEntry = await Otp.findOne({ where: { userId: user.id } });
  if (!otpEntry) {
    const err: any = new Error("OTP not found. Please request a new one.");
    err.status = 404;
    throw err;
  }

  if (new Date() > otpEntry.expireAt) {
    await Otp.destroy({ where: { id: otpEntry.id } });
    const err: any = new Error("OTP has expired. Please request a new one.");
    err.status = 410;
    throw err;
  }

  if (otpEntry.otp.toString() !== otp.toString()) {
    const err: any = new Error("Invalid OTP");
    err.status = 401;
    throw err;
  }

  const messageTemplate = otpVerifiedTemplate();
  await sendMail(email, "OTP Successfully verified", messageTemplate);

  // Delete OTP after successful verification
  await Otp.destroy({ where: { id: otpEntry.id } });
};
