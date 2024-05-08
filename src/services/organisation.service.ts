import OrganisationDao from "../dao/organisation.dao";

class OrganisationService {
  private organisationDao = new OrganisationDao()

  public fetchOrganisations = async (requestBody: Object) => {
    return await this.organisationDao.getOrganisations()
  }

  public fetchOrganisation = async (requestBody: Object) => {
     return await this.organisationDao.getOrganisation(requestBody)
  }
}

export default OrganisationService