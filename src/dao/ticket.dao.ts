import TicketModel from "../models/ticket.model"
import TicketType from "../typings/ticket"

import mongoose from "mongoose"

class TicketDao {
  public getOrgTickets = async (organisation_id: string, page: string, pageSize: string, sortBy: string, filters: any) => {
    // if (page){
    //   const pageNum = parseInt(page) || 1;
    //   const pageSizeNum = parseInt(pageSize) || 10;
    //   const skip = (pageNum - 1) * pageSizeNum;

    //   console.log(pageNum, skip)
    //   if (organisation_id) return await OrganisationUserModel.find({...filters, is_active: true, "organisations.organisation_id": organisation_id}).sort(sortBy).skip(skip).limit(pageSizeNum)
    //   else{
    //     console.log("HEY")
    //     return await OrganisationUserModel.find({...filters, is_active: true}).sort(sortBy).skip(skip).limit(pageSizeNum)
    //   }
    // }

    // return await OrganisationUserModel.find({...filters, is_active: true}).sort(sortBy)   
    
    if (page){
      const pageNum = parseInt(page) || 1;
      const pageSizeNum = parseInt(pageSize) || 10;
      const skip = (pageNum - 1) * pageSizeNum;

      return await TicketModel.find({...filters, organisation: organisation_id, is_active: true}).sort(sortBy).skip(skip).limit(pageSizeNum)
    }

    return await TicketModel.find({...filters, organisation: organisation_id, is_active: true}).sort(sortBy)
  }

  public getTotalOrgTickets = async (organisation_id: string, filters: any) => {
    return await TicketModel.countDocuments({...filters, organisation: organisation_id, is_active: true})
  }

  public getTicket = async (id: string) => {
    return await TicketModel.findOne({unique_id: id})
  }

  public addTicket = async (ticket: TicketType) => {
    return await TicketModel.create(ticket)
  }

  public updateTicket = async (id: string, ticket: TicketType) => {
    return await TicketModel.updateOne(
      {unique_id: id},
      {
        $set: ticket
      }
    )

  }

  public deleteTicket = async (id: string) => {
    return await TicketModel.updateOne(
      {unique_id: id},
      {
        $set: {
          is_active: false
        }
      }
    )
  }
}

export default TicketDao