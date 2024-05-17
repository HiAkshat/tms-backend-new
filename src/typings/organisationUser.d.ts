export interface OrganisationUserType {
  unique_id: string,
  email_id: string,
  first_name: string,
  last_name: string,
  dob: Date,
  organisations: {
    organisation_id: string,
    joining_date: Date
  }[],
  otp?: number,
  otpExpiration?: Date,
  is_active: boolean
}

export interface RecieveOrganisationUserType {
  email_id: string,
  first_name: string,
  last_name: string,
  dob: Date,
  organisation: string,
  joining_date: Date
}

export default OrganisationUserType