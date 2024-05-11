export interface OrganisationType extends Document {
  organisation_name: string,
  display_name: string,
  total_ticket: number
}

export default OrganisationType