import nodemailer from "nodemailer"
import SystemUserType from "../typings/systemUser";
import OrganisationUserType from "../typings/organisationUser";

import jwt from "jsonwebtoken"

class OtpHelper {
  public sendOTP = async (email_id: string, otp: number) => {
    try {
      // Transporter setup for gmail (password is app password)
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "tmsbackend3@gmail.com",
          pass: "rtnxnaudkzekgpmc",
        },
      });
  
      const mailOptions = {
        from: 'tmsbackend3@gmail.com',
        to: email_id,
        subject: 'Your OTP for login',
        text: `Your OTP is: ${otp}. It is valid for 15 minutes.`,
      };
  
      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          console.error('Error sending OTP:', error);
        }
        
        console.log('OTP sent:', info.response);
      });
      
      return {message: "OTP Sent!"}
  
    } catch (error) {
      console.error('Error:', error);
    }
  }

  public verifyOtp = async (otp: number, user: SystemUserType | OrganisationUserType) => {
    console.log(user)
    console.log(user.otp == otp)
    console.log(user.otpExpiration && user.otpExpiration.getTime() > Date.now())
    try {
      if (user.otp == otp && user.otpExpiration && user.otpExpiration.getTime() > Date.now()) {
        const accessToken = jwt.sign({user}, "thisisthekey", { expiresIn: '5h' });
        return { accessToken, valid: true, message: 'OTP is valid' }
      }
      else return { valid: false, message: 'OTP is invalid' }
    } catch (error) {
      throw error
    }
  }

  // public thro
}

export default OtpHelper

