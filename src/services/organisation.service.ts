import OrganisationDao from "../dao/organisation.dao";

class OrganisationService {
  private organisationDao = new OrganisationDao()

  public fetchOrganisations = async (requestQuery: any) => {
    const totalEntries = await this.organisationDao.getTotalOrganisations()
    const data = await this.organisationDao.getOrganisations(requestQuery)
    return {totalEntries, data}

  }

  public fetchOrganisation = async (requestBody: any) => {
     return await this.organisationDao.getOrganisation(requestBody)
  }

  public postOrganisation = async (requestBody: any) => {
    return await this.organisationDao.addOrganisation(requestBody)
  }

  public updateOrganisation = async (requestParams: any, requestBody: any) => {
    return await this.organisationDao.updateOrganisation(requestParams, requestBody)
  }

  public deleteOrganisation = async (requestParams: any) => {
    return await this.organisationDao.deleteOrganisation(requestParams)
  }
}

export default OrganisationService