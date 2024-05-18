import { model, Schema, Document } from 'mongoose';
import OrganisationType from '../typings/organisation';

const organisationSchema = new Schema({
  unique_id: {type: String, unique: true, required: true},
  organisation_name: { type: String, required: true },
  display_name: { type: String, required: true },
  total_tickets: { type: Number, default: 0},
  is_active: {type: Boolean, default: true, required: true}
}, {timestamps: true});

const organisationModel = model<OrganisationType>("organisation", organisationSchema)
export default organisationModel