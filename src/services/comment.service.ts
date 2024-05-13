import CommentDao from "../dao/comment.dao"
import CommentType from "../typings/comment"

class CommentService {
  private commentDao = new CommentDao()

  public fetchComments = async (ticket_id: string) => {
    return await this.commentDao.getComments(ticket_id)
  }

  public postComment = async (comment: CommentType) => {
    return await this.commentDao.addCommment(comment)
  }

  public deleteComment = async (id: string) => {
    return await this.commentDao.deleteComment(id)
  }
}

export default CommentService