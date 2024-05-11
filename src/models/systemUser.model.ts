import { model, Schema, Document } from 'mongoose';
import SystemUserType from '../typings/systemUser';

const systemUserSchema = new Schema({
  email_id: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  dob: { type: Date, required: true },
  otp: { type: Number }, // Store OTP
  otpExpiration: { type: Date }, // Store OTP expiration time
});

const SystemUserModel = model<SystemUserType>("systemuser", systemUserSchema)
export default SystemUserModel