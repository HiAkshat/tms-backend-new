import CommentModel from "../models/comment.model"
import CommentType from "../typings/comment"

class CommentDao {
  public getComments = async (requestParams: {ticket_id: string}) => {
    return await CommentModel.find({ticket: requestParams.ticket_id}).populate('user')
  }

  public addCommment = async (requestBody: CommentType) => {
    return await CommentModel.create(requestBody)
  }

  public deleteComment = async (requestParams: {id: string}) => {
    return await CommentModel.findByIdAndDelete(requestParams.id)
  }
}

export default CommentDao