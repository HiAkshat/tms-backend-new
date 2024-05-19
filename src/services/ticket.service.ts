import TicketDao from "../dao/ticket.dao";
import OrganisationDao from "../dao/organisation.dao";

import { v4 as uuidv4 } from 'uuid';
import TicketType from "../typings/ticket";

class TicketService {
  private ticketDao = new TicketDao()
  private organisationDao = new OrganisationDao()

  public fetchOrgTickets = async (organisation_id: string, page: string="", pageSize: string="10", sortBy: string="-updatedAt", filters: any) => {
    const {start_due_date, end_due_date, ...otherFilters} = filters
  
    let updated_filters = {...otherFilters}
    if (start_due_date && end_due_date) {
      updated_filters.due_date = {
          $gte: new Date(start_due_date),
          $lte: new Date(end_due_date)
      };
    }
    
    updated_filters = Object.keys(updated_filters).reduce((acc: any, key) => {
      if (updated_filters[key]) {
          acc[key] = filters[key];

          // const caseInsensitiveKeys = ['first_name', 'last_name', "email_id"];

          // if (caseInsensitiveKeys.includes(key) && typeof updated_filters[key] === 'string') {
          //   acc[key] = { $regex: new RegExp(filters[key], 'i') } // 'i' makes the regex case-insensitive
          // } else {
          //     acc[key] = updated_filters[key];
          // }
        }
        return acc;
    }, {});
    
    const totalEntries = await this.ticketDao.getTotalOrgTickets(organisation_id, filters)
    const data = await this.ticketDao.getOrgTickets(organisation_id, page, pageSize, sortBy, filters)
    return {totalEntries, data}
  }

  public fetchTicket = async (id: string) => {
     return await this.ticketDao.getTicket(id)
  }

  public postTicket = async (ticket: TicketType) => {
    let org_data = await this.organisationDao.getOrganisation(ticket.organisation)
    let ticket_key: string = ""
    if (org_data){
      ticket_key = `${org_data.organisation_name}-${org_data.total_tickets+1}`
      org_data.total_tickets+=1
      await org_data.save()
    }
    else{
      throw new Error("Organisation not found!")
    }

    ticket = {
      ...ticket,
      unique_id: uuidv4(),
      key: ticket_key,
      is_active: true
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