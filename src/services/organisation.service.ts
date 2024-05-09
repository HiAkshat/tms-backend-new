import OrganisationDao from "../dao/organisation.dao";

class OrganisationService {
  private organisationDao = new OrganisationDao()

  public fetchOrganisations = async (requestBody: Object) => {
    return await this.organisationDao.getOrganisations()
  }

  public fetchOrganisation = async (requestBody: Object) => {
     return await this.organisationDao.getOrganisation(requestBody)
  }

  public postOrganisation = async (requestBody: Object) => {
    return await this.organisationDao.addOrganisation(requestBody)
  }

  public updateOrganisation = async (requestParams: Object, requestBody: Object) => {
    return await this.organisationDao.updateOrganisation(requestParams, requestBody)
  }

  public deleteOrganisation = async (requestParams: Object) => {
    return await this.organisationDao.deleteOrganisation(requestParams)
  }
}

export default OrganisationService