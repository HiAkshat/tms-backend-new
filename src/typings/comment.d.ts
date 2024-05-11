export interface CommentType extends Document {
  ticket: string,
  user: string,
  content: string
}

export default CommentType