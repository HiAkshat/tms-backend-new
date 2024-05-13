import TicketModel from "../models/ticket.model"
import TicketType from "../typings/ticket"

class TicketDao {
  public getOrgTickets = async (organisation_id: string) => {
    return await TicketModel.find({organisation: organisation_id}).populate('assignee').populate('reporter')
  }

  public getTicket = async (id: string) => {
    return await TicketModel.findById(id).populate('assignee').populate('reporter')
  }

  public addTicket = async (ticket: TicketType) => {
    return await TicketModel.create(ticket)
  }

  public updateTicket = async (id: string, ticket: TicketType) => {
    await TicketModel.findByIdAndUpdate(id, ticket, { new: true });
  }

  public deleteTicket = async (id: string) => {
    return await TicketModel.findByIdAndDelete(id)
  }
}

export default TicketDao