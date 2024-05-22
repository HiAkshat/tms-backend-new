export interface CommentType extends Document {
  ticket: string,
  user_id: string,
  user_name: string,
  content: string
}

export default CommentType