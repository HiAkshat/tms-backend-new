import CommentModel from "../models/comment.model"
import CommentType from "../typings/comment"

class CommentDao {
  public getComments = async (requestParams: any) => {
    return await CommentModel.find({ticket: requestParams.ticket_id}).populate('user')
  }

  public addCommment = async (requestBody: any) => {
    return await CommentModel.create(requestBody)
  }

  public deleteComment = async (requestParams: any) => {
    return await CommentModel.findByIdAndDelete(requestParams.id)
  }
}

export default CommentDao