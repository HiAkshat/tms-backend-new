import organisationUserModel from "../models/organisationUser.model";

class OrganisationUserDao {
  public getOrganisationUsers = async () => {
    return await organisationUserModel.find({})
  }

  public getOrganisationUser = async (requestBody: any) => {
    return await organisationUserModel.findById(requestBody.id)
  }
  
  public getOrganisationUserByEmail = async (requestParams: any) => {
    return await organisationUserModel.findOne({email_id: requestParams.email_id})
  }

  public getOrganisationUserByOrgID = async (requestParams: any) => {
    return await organisationUserModel.find({organisation: requestParams.id})
  }

  public addOrganisationUser = async (requestBody: any) => {
    return await organisationUserModel.create(requestBody)
  }

  public updateOrganisationUser = async (requestParams: any, requestBody: any) => {
    return await organisationUserModel.findByIdAndUpdate(requestParams.id, requestBody, {new: true})
  }

  public deleteOrganisationUser = async (requestParams: any) => {
    return await organisationUserModel.findByIdAndDelete(requestParams.id)
  }
}

export default OrganisationUserDao