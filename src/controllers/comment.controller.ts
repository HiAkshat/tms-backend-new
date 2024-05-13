import { NextFunction, Request, Response } from "express";
import CommentService from "../services/comment.service";

class CommentController {
  public commentService = new CommentService()

  public getComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {ticket_id} = req.params

    try {
      const responseBody = await this.commentService.fetchComments(ticket_id)
      res.status(200).json(responseBody)
    } catch (error) {
      res.status(400).json({error})
    }
  }

  public addComment = async (req: Request, res:Response, next: NextFunction): Promise<void> => {
    const ticket = req.body
    try {
      const responseBody = await this.commentService.postComment(ticket)
      res.status(200).json(responseBody)
      console.log("Comment added!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public deleteComment = async (req: Request, res:Response, next: NextFunction): Promise<void> => {
    const {id} = req.params
    try {
      const responseBody = await this.commentService.deleteComment(id)
      res.status(200).json(responseBody)
      console.log("Comment deleted!")
    } catch (error) {
      res.status(400).json(error)
    }
  }
}

 export default CommentController