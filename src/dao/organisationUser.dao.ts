import OrganisationUserModel from "../models/organisationUser.model";

class OrganisationUserDao {
  public getOrganisationUsers = async () => {
    return await OrganisationUserModel.find({})
  }

  public getOrganisationUser = async (requestBody: any) => {
    return await OrganisationUserModel.findById(requestBody.id)
  }
  
  public getOrganisationUserByEmail = async (requestParams: any) => {
    return await OrganisationUserModel.findOne({email_id: requestParams.email_id})
  }

  public getOrganisationUserByOrgID = async (requestParams: any) => {
    return await OrganisationUserModel.find({organisation: requestParams.id})
  }

  public addOrganisationUser = async (requestBody: any) => {
    return await OrganisationUserModel.create(requestBody)
  }

  public updateOrganisationUser = async (requestParams: any, requestBody: any) => {
    return await OrganisationUserModel.findByIdAndUpdate(requestParams.id, requestBody, {new: true})
  }

  public deleteOrganisationUser = async (requestParams: any) => {
    return await OrganisationUserModel.findByIdAndDelete(requestParams.id)
  }
}

export default OrganisationUserDao