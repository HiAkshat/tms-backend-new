import { model, Schema, Document } from 'mongoose';
import TicketType from '../typings/ticket';

const ticketSchema = new Schema({
  type: { type: String, enum: ['Story', 'Task', 'Bug'], required: true },
  key: { type: String, unique: true, required: true },
  summary: { type: String, required: true },
  description: { type: String },
  assignee: { type: Schema.Types.ObjectId, ref: 'organisationuser', required: true },
  reporter: { type: Schema.Types.ObjectId, ref: 'organisationuser', required: true },
  organisation: {type: Schema.Types.ObjectId, ref: 'organisation', required: true},
  status: { type: String, enum: ['To be picked', 'In progress', 'In testing', 'Completed'], default: 'To be picked', required: true },
  due_date: { type: Date },
  files: [{ type: String }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {timestamps: true});

const TicketModel = model<TicketType>("ticket", ticketSchema)
export default TicketModel