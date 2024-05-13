import TicketModel from "../models/ticket.model"
import TicketType from "../typings/ticket"

class TicketDao {
  public getOrgTickets = async (requestParams: {id: string}) => {
    console.log(requestParams)
    return await TicketModel.find({organisation: requestParams.id}).populate('assignee').populate('reporter')
  }

  public getTicket = async (requestParams: {id: string}) => {
    return await TicketModel.findById(requestParams.id).populate('assignee').populate('reporter')
  }

  public addTicket = async (requestBody: TicketType) => {
    return await TicketModel.create(requestBody)
  }

  public updateTicket = async (requestParams: {id: string}, requestBody: TicketType) => {
    await TicketModel.findByIdAndUpdate(requestParams.id, requestBody, { new: true });
  }

  public deleteTicket = async (requestParams: {id: string}) => {
    return await TicketModel.findByIdAndDelete(requestParams.id)
  }
}

export default TicketDao