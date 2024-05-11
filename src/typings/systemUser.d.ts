export interface SystemUserType extends Document {
  email_id: string,
  first_name: string,
  last_name: string,
  dob: Date,
  otp?: number,
  otpExpiration?: Date
}

export default SystemUserType