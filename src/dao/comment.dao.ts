import CommentModel from "../models/comment.model"
import CommentType from "../typings/comment"
import TicketType from "../typings/ticket"

class CommentDao {
  public getComments = async (ticket: string) => {
    return await CommentModel.find({ticket})
  }

  public addCommment = async (comment: CommentType) => {
    return await CommentModel.create(comment)
  }

  public deleteComment = async (id: string) => {
    return await CommentModel.findByIdAndDelete(id)
  }
}

export default CommentDao