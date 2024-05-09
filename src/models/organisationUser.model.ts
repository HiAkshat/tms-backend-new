import { model, Schema, Document } from 'mongoose';
import { Organisation } from './organisation.model';

export interface OrganisationUser extends Document {
  email_id: string,
  first_name: string,
  last_name: string,
  dob: Date,
  organisation: Organisation,
  joining_date: Date,
  otp?: number,
  otpExpiration?: Date
}

const organisationUserSchema = new Schema({
  email_id: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  dob: { type: Date, required: true },
  organisation: { type: Schema.Types.ObjectId, ref: 'Organisation', required: true },
  joining_date: { type: Date, required: true },
  otp: { type: Number }, // Store OTP
  otpExpiration: { type: Date }, // Store OTP expiration time
});

const organisationUserModel = model<OrganisationUser>("organisationuser", organisationUserSchema)
export default organisationUserModel