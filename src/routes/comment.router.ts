import {Router} from "express"
import CommentController from "../controllers/comment.controller"

class CommentRoutes{
  public commentPath = "/comment"
  public router = Router()
  public commentController = new CommentController()

  constructor(){
    this.initializeTicketRoutes(`${this.commentPath}`)
  }

  private initializeTicketRoutes(prefix: string) {
    // GET
    this.router.get(`${prefix}/:ticket_id`, this.commentController.getComments)

    // POST
    this.router.post(`${prefix}`, this.commentController.addComment)
    
    // DELETE
    this.router.delete(`${prefix}/:id`, this.commentController.deleteComment)
  }
}

export default CommentRoutes