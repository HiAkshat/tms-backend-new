import TicketDao from "../dao/ticket.dao";
import TicketType from "../typings/ticket";

class TicketService {
  private ticketDao = new TicketDao()

  public fetchOrgTickets = async (organisation_id: string) => {
    return await this.ticketDao.getOrgTickets(organisation_id)
  }

  public fetchTicket = async (id: string) => {
     return await this.ticketDao.getTicket(id)
  }

  public postTicket = async (ticket: TicketType) => {
    return await this.ticketDao.addTicket(ticket)
  }

  public updateTicket = async (id: string, ticket: TicketType) => {
    return await this.ticketDao.updateTicket(id, ticket)
  }

  public deleteTicket = async (id: string) => {
    return await this.ticketDao.deleteTicket(id)
  }
}

export default TicketService