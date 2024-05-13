import organisationUserModel from "../models/organisationUser.model";
import OrganisationUserModel from "../models/organisationUser.model";
import OrganisationUserType from "../typings/organisationUser";

class OrganisationUserDao {
  public getOrganisationUsers = async (page: string, pageSize: string) => {
    const pageNum = parseInt(page) || 1;
    const pageSizeNum = parseInt(pageSize) || 10;
    const skip = (pageNum - 1) * pageSizeNum;

    return await OrganisationUserModel.find({}).populate('organisation').skip(skip).limit(pageSizeNum)
  }

  public getTotalOrganisationUsers = async () => {
    return await organisationUserModel.countDocuments({});
  }

  public getOrganisationUser = async (id: string) => {
    return await OrganisationUserModel.findById(id).populate('organisation')
  }
  
  public getOrganisationUserByEmail = async (email_id: string) => {
    return await OrganisationUserModel.findOne({email_id}).populate('organisation')
  }

  public getOrganisationUserByOrgID = async (id: string) => {
    return await OrganisationUserModel.find({organisation: id}).populate('organisation')
  }

  public addOrganisationUser = async (organisation_user: OrganisationUserType) => {
    return await OrganisationUserModel.create(organisation_user)
  }

  public updateOrganisationUser = async (id: string, organisation_user: OrganisationUserType) => {
    return await OrganisationUserModel.findByIdAndUpdate(id, organisation_user, {new: true})
  }

  public deleteOrganisationUser = async (id: string) => {
    return await OrganisationUserModel.findByIdAndDelete(id)
  }
}

export default OrganisationUserDao