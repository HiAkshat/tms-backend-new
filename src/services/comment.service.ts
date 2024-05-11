import CommentDao from "../dao/comment.dao"

class CommentService {
  private commentDao = new CommentDao()

  public fetchComments = async (requestParams: Object) => {
    return await this.commentDao.getComments(requestParams)
  }

  public postComment = async (requestBody: Object) => {
    return await this.commentDao.addCommment(requestBody)
  }

  public deleteComment = async (requestParams: Object) => {
    return await this.commentDao.deleteComment(requestParams)
  }
}

export default CommentService