import { model, Schema } from 'mongoose';
import CommentType from '../typings/comment';

const commentSchema = new Schema({
  ticket: { type: String, required: true },
  user_id: { type: String, required: true },
  user_name: {type: String, required: true},
  content: { type: String, required: true },
}, {timestamps: true});

const CommentModel = model<CommentType>("comment", commentSchema)
export default CommentModel