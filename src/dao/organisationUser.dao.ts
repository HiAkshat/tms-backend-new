import organisationUserModel from "../models/organisationUser.model";
import OrganisationUserModel from "../models/organisationUser.model";
import OrganisationUserType from "../typings/organisationUser";

class OrganisationUserDao {
  public getOrganisationUsers = async (requestQuery: any) => {
    const page = parseInt(requestQuery.page) || 1;
    const pageSize = parseInt(requestQuery.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    return await OrganisationUserModel.find({}).populate('organisation').skip(skip).limit(pageSize)
  }

  public getTotalOrganisationUsers = async () => {
    return await organisationUserModel.countDocuments({});
  }

  public getOrganisationUser = async (requestBody: {id: string}) => {
    return await OrganisationUserModel.findById(requestBody.id).populate('organisation')
  }
  
  public getOrganisationUserByEmail = async (requestParams: {email_id: string}) => {
    return await OrganisationUserModel.findOne({email_id: requestParams.email_id}).populate('organisation')
  }

  public getOrganisationUserByOrgID = async (requestParams: {id: string}) => {
    return await OrganisationUserModel.find({organisation: requestParams.id}).populate('organisation')
  }

  public addOrganisationUser = async (requestBody: OrganisationUserType) => {
    return await OrganisationUserModel.create(requestBody)
  }

  public updateOrganisationUser = async (requestParams: {id: string}, requestBody: any) => {
    return await OrganisationUserModel.findByIdAndUpdate(requestParams.id, requestBody, {new: true})
  }

  public deleteOrganisationUser = async (requestParams: {id: string}) => {
    return await OrganisationUserModel.findByIdAndDelete(requestParams.id)
  }
}

export default OrganisationUserDao