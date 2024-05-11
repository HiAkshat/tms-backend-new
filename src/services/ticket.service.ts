import TicketDao from "../dao/ticket.dao";

class TicketService {
  private ticketDao = new TicketDao()

  public fetchOrgTickets = async (requestParams: Object) => {
    return await this.ticketDao.getOrgTickets(requestParams)
  }

  public fetchTicket = async (requestParams: Object) => {
     return await this.ticketDao.getTicket(requestParams)
  }

  public postTicket = async (requestBody: Object) => {
    return await this.ticketDao.addTicket(requestBody)
  }

  public updateTicket = async (requestParams: Object, requestBody: Object) => {
    return await this.ticketDao.updateTicket(requestParams, requestBody)
  }

  public deleteTicket = async (requestParams: Object) => {
    return await this.ticketDao.deleteTicket(requestParams)
  }
}

export default TicketService