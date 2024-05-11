import TicketModel from "../models/ticket.model"

class TicketDao {
  public getOrgTickets = async (requestParams: any) => {
    console.log(requestParams)
    return await TicketModel.find({organisation: requestParams.id}).populate('assignee').populate('reporter')
  }

  public getTicket = async (requestParams: any) => {
    return await TicketModel.findById(requestParams.id).populate('assignee').populate('reporter')
  }

  public addTicket = async (requestBody: any) => {
    return await TicketModel.create(requestBody)
  }

  public updateTicket = async (requestParams: any, requestBody: any) => {
    await TicketModel.findByIdAndUpdate(requestParams.id, requestBody, { new: true });
  }

  public deleteTicket = async (requestParams: any) => {
    return await TicketModel.findByIdAndDelete(requestParams.id)
  }
}

export default TicketDao