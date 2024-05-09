import nodemailer from "nodemailer"

class OtpHelper {
  public sendOTP = async (email_id: string, otp: number) => {
    console.log("INSIDE OTP")
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
}

export default OtpHelper

