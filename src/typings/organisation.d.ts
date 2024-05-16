export interface OrganisationType extends Document {
  unique_id: string,
  organisation_name: string,
  display_name: string,
  total_tickets: number,
  is_active?: boolean
}

export default OrganisationType