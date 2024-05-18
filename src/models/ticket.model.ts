import { model, Schema, Document } from 'mongoose';
import TicketType from '../typings/ticket';

const ticketSchema = new Schema({
  unique_id: {type: String, required: true},
  type: { type: String, enum: ['Story', 'Task', 'Bug'], required: true },
  key: { type: String, unique: true, required: true },
  summary: { type: String, required: true },
  description: { type: String },
  assignee_id: {type: String, required: true},
  assignee_name: {type: String, required: true},
  reporter_id: { type: String, required: true },
  reporter_name: {type: String, required: true},
  organisation: {type: String, required: true},
  status: { type: String, enum: ['To be picked', 'In progress', 'In testing', 'Completed'], default: 'To be picked', required: true },
  due_date: { type: Date },
  files: [{ type: String }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  is_active: { type: Boolean, default: true, required: true}
}, {timestamps: true});

const TicketModel = model<TicketType>("ticket", ticketSchema)
export default TicketModel