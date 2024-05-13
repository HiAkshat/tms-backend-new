import organisationModel from "../models/organisation.model";
import OrganisationType from "../typings/organisation";

class OrganisationDao {
  public getOrganisations = async (requestQuery: any) => {
    const page = parseInt(requestQuery.page) || 1;
    const pageSize = parseInt(requestQuery.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    return await organisationModel.find({}).skip(skip).limit(pageSize)
  }

  public getTotalOrganisations = async () => {
    return await organisationModel.countDocuments({});
  }

  public getOrganisation = async (requestBody: {id: string}) => {
    return await organisationModel.findById(requestBody.id)
  }

  public addOrganisation = async (requestBody: OrganisationType) => {
    return await organisationModel.create(requestBody)
  }

  public updateOrganisation = async (requestParams: {id: string}, requestBody: OrganisationType) => {
    return await organisationModel.findByIdAndUpdate(requestParams.id, requestBody, {new: true})
  }

  public deleteOrganisation = async (requestParams: {id: string}) => {
    return await organisationModel.findByIdAndDelete(requestParams.id)
  }
}

export default OrganisationDao