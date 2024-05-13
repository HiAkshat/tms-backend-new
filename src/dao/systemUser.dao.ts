import SystemUserModel from "../models/systemUser.model"
import SystemUserType from "../typings/systemUser"

class SystemUserDao {
  public getSystemUsers = async () => {
    console.log("HEYINDAO")
    return await SystemUserModel.find({})
  }

  public getSystemUser = async (requestBody: any) => {
    return await SystemUserModel.findById(requestBody.id)
  }
  
  public getSystemUserByEmail = async (requestParams: any) => {
    return await SystemUserModel.findOne({email_id: requestParams.email_id})
  }

  public addSystemUser = async (requestBody: SystemUserType) => {
    return await SystemUserModel.create(requestBody)
  }

  public updateSystemUser = async (requestParams: any, requestBody: any) => {
    return await SystemUserModel.findByIdAndUpdate(requestParams.id, requestBody, {new: true})
  }

  public deleteSystemUser = async (requestParams: any) => {
    return await SystemUserModel.findByIdAndDelete(requestParams.id)
  }


}

export default SystemUserDao