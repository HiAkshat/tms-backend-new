export interface OrganisationUserType extends Document {
  email_id: string,
  first_name: string,
  last_name: string,
  dob: Date,
  organisation: Organisation,
  joining_date: Date,
  otp?: number,
  otpExpiration?: Date
}

export default OrganisationUserType