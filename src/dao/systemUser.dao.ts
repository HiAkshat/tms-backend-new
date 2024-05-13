import SystemUserModel from "../models/systemUser.model"
import SystemUserType from "../typings/systemUser"

class SystemUserDao {
  public getSystemUsers = async () => {
    return await SystemUserModel.find({})
  }

  public getSystemUser = async (id: string) => {
    return await SystemUserModel.findById(id)
  }
  
  public getSystemUserByEmail = async (email_id: string) => {
    return await SystemUserModel.findOne({email_id})
  }

  public addSystemUser = async (system_user: SystemUserType) => {
    return await SystemUserModel.create(system_user)
  }

  public updateSystemUser = async (id: string, system_user: SystemUserType) => {
    return await SystemUserModel.findByIdAndUpdate(id, system_user, {new: true})
  }

  public deleteSystemUser = async (id: string) => {
    return await SystemUserModel.findByIdAndDelete(id)
  }
}

export default SystemUserDao