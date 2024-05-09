import { model, Schema, Document } from 'mongoose';

export interface SystemUser extends Document {
  email_id: string,
  first_name: string,
  last_name: string,
  dob: Date,
  otp?: number,
  otpExpiration?: Date
}

const systemUserSchema = new Schema({
  email_id: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  dob: { type: Date, required: true },
  otp: { type: Number }, // Store OTP
  otpExpiration: { type: Date }, // Store OTP expiration time
});

const SystemUserModel = model<SystemUser>("systemuser", systemUserSchema)
export default SystemUserModel