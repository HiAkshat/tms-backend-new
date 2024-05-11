import { model, Schema, Document } from 'mongoose';
import OrganisationType from '../typings/organisation';

const organisationSchema = new Schema({
  organisation_name: { type: String, unique: true, required: true },
  display_name: { type: String, required: true },
  total_tickets: { type: Number, default: 0}
});

const organisationModel = model<OrganisationType>("organisation", organisationSchema)
export default organisationModel