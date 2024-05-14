import { model, Schema, Document } from 'mongoose';
import OrganisationUserType from '../typings/organisationUser';

const organisationUserSchema = new Schema({
  email_id: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  dob: { type: Date, required: true },
  organisation: { type: Schema.Types.ObjectId, ref: 'organisation', required: true },
  joining_date: { type: Date, required: true },
  otp: { type: Number }, // Store OTP
  otpExpiration: { type: Date }, // Store OTP expiration time
  is_active: {type: Boolean},
});

const organisationUserModel = model<OrganisationUserType>("organisationuser", organisationUserSchema)
export default organisationUserModel