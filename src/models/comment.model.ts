import { model, Schema } from 'mongoose';
import CommentType from '../typings/comment';

const commentSchema = new Schema({
  ticket: { type: Schema.Types.ObjectId, ref: 'ticket', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'organisationuser', required: true },
  content: { type: String, required: true },
}, {timestamps: true});

const CommentModel = model<CommentType>("comment", commentSchema)
export default CommentModel