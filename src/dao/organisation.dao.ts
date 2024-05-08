import organisationModel from "../models/organisation.model";

class OrganisationDao {
  public getOrganisations = async () => {
    return await organisationModel.find({})
  }

  public getOrganisation = async (requestBody: any) => {
    return await organisationModel.findById(requestBody.id)
  }
}

export default OrganisationDao