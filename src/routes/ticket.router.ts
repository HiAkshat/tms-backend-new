import {Router} from "express"
import TicketController from "../controllers/ticket.controller"

class TicketRoutes{
  public ticketPath = "/ticket"
  public router = Router()
  public ticketController = new TicketController()

  constructor(){
    this.initializeSystemUserRoutes(`${this.ticketPath}`)
  }

  private initializeSystemUserRoutes(prefix: string){
    // GET
    this.router.get(`${prefix}/organisation/:id`, this.ticketController.getOrgTickets)
    this.router.get(`${prefix}/:id`, this.ticketController.getTicket)

    // POST
    this.router.post(`${prefix}/`, this.ticketController.addTicket)

    // PUT
    this.router.put(`${prefix}/:id`, this.ticketController.updateTicket)

    // DELETE
    this.router.delete(`${prefix}/:id`, this.ticketController.deleteTicket)
  }
}

export default TicketRoutes