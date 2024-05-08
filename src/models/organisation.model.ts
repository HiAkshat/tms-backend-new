// import mongoose from "mongoose"
// const { Schema } = mongoose;

// const organisationSchema = new Schema({
//   organisation_name: { type: String, unique: true, required: true },
//   display_name: { type: String, required: true },
//   total_tickets: { type: Number, default: 0}
// });

// const Organisation = mongoose.model('Organisation', organisationSchema);

// export { Organisation };

import { model, Schema, Document } from 'mongoose';

export interface Organisation extends Document {
  organisation_name: string,
  display_name: string,
  total_ticket: number
}

const organisationSchema = new Schema({
  organisation_name: { type: String, unique: true, required: true },
  display_name: { type: String, required: true },
  total_tickets: { type: Number, default: 0}
});

const organisationModel = model<Organisation>("organisation", organisationSchema)
export default organisationModel