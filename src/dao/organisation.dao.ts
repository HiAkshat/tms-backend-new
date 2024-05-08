import organisationModel from "../models/organisation.model";

class OrganisationDao {
  public getOrganisations = async () => {
    return await organisationModel.find({})
  }

  public getOrganisation = async (requestBody: any) => {
    return await organisationModel.findById(requestBody.id)
  }

  public addOrganisation = async (requestBody: any) => {
    return await organisationModel.create(requestBody)
  }

  public updateOrganisation = async (requestParams: any, requestBody: any) => {
    return await organisationModel.findByIdAndUpdate(requestParams.id, requestBody, {new: true})
  }

  public deleteOrganisation = async (requestParams: any) => {
    return await organisationModel.findByIdAndDelete(requestParams.id)
  }
}

export default OrganisationDao