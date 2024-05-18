import { model, Schema, Document } from 'mongoose';
import OrganisationUserType from '../typings/organisationUser';

const organisationUserSchema = new Schema({
  unique_id: {type: String, require: true},
  email_id: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  dob: { type: Date, required: true },
  organisations: [{
    organisation_id: {type: String},
    joining_date: {type: Date}
  }],
  otp: { type: Number }, // Store OTP
  otpExpiration: { type: Date }, // Store OTP expiration time
  is_active: {type: Boolean, default: true, required: true},
}, {timestamps: true});

const organisationUserModel = model<OrganisationUserType>("organisationuser", organisationUserSchema)
export default organisationUserModel