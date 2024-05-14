import TicketDao from "../dao/ticket.dao";
import OrganisationDao from "../dao/organisation.dao";

import TicketType from "../typings/ticket";

class TicketService {
  private ticketDao = new TicketDao()
  private organisationDao = new OrganisationDao()


  public fetchOrgTickets = async (organisation_id: string) => {
    return await this.ticketDao.getOrgTickets(organisation_id)
  }

  public fetchTicket = async (id: string) => {
     return await this.ticketDao.getTicket(id)
  }

  public postTicket = async (ticket: TicketType) => {
    let org_data = await this.organisationDao.getOrganisation(ticket.organisation)
    if (org_data){
      ticket.key = `${org_data.organisation_name}-${org_data.total_tickets+1}`
      org_data.total_tickets+=1
      await org_data.save()
    }

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