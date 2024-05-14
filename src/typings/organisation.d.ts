export interface OrganisationType extends Document {
  organisation_name: string,
  display_name: string,
  total_tickets: number
}

export default OrganisationType