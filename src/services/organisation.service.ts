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

  public updateOrganisation = async (requuestParams: Object, requestBody: Object) => {
    return await this.organisationDao.updateOrganisation(requuestParams, requestBody)
  }

  public deleteOrganisation = async (requuestParams: Object) => {
    return await this.organisationDao.deleteOrganisation(requuestParams)
  }
}

export default OrganisationService