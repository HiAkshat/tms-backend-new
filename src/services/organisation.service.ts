import OrganisationDao from "../dao/organisation.dao";
import OrganisationType from "../typings/organisation";

class OrganisationService {
  private organisationDao = new OrganisationDao()

  public fetchOrganisations = async (page: string = "1", pageSize:string ="10") => {
    const totalEntries = await this.organisationDao.getTotalOrganisations()
    const data = await this.organisationDao.getOrganisations(page, pageSize)
    return {totalEntries, data}
  }

  public fetchOrganisation = async (id: string) => {
     return await this.organisationDao.getOrganisation(id)
  }

  public postOrganisation = async (organisation: OrganisationType) => {
    return await this.organisationDao.addOrganisation(organisation)
  }

  public updateOrganisation = async (id: string, organisation: OrganisationType) => {
    return await this.organisationDao.updateOrganisation(id, organisation)
  }

  public deleteOrganisation = async (id: string) => {
    return await this.organisationDao.deleteOrganisation(id)
  }
}

export default OrganisationService