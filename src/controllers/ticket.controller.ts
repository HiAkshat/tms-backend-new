import { NextFunction, Request, Response } from "express";
import TicketService from "../services/ticket.service";

class TicketController {
  public ticketService = new TicketService()

  public getOrgTickets = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {id} = req.params

    try {
      const responseBody = await this.ticketService.fetchOrgTickets(id)
      res.status(200).json(responseBody)
      console.log("Tickets retrieved!")
    } catch (error) {
      res.status(400).json({error})
    }
  }

  public getTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {id} = req.params
    try {
      const responseBody = await this.ticketService.fetchTicket(id)
      res.status(200).json(responseBody)
      console.log("Ticket data retrieved!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public addTicket = async (req: Request, res:Response, next: NextFunction): Promise<void> => {
    const ticket = req.body
    try {
      const responseBody = await this.ticketService.postTicket(ticket)
      res.status(200).json(responseBody)
      console.log("Ticket added!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public updateTicket = async (req: Request, res:Response, next: NextFunction): Promise<void> => {
    const ticket = req.body
    const {id} = req.params
    try {
      const responseBody = await this.ticketService.updateTicket(id, ticket)
      res.status(200).json(responseBody)
      console.log("System user updated!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public deleteTicket = async (req: Request, res:Response, next: NextFunction): Promise<void> => {
    const {id} = req.params
    try {
      const responseBody = await this.ticketService.deleteTicket(id)
      res.status(200).json(responseBody)
      console.log("Ticket deleted!")
    } catch (error) {
      res.status(400).json(error)
    }
  }
}

 export default TicketController