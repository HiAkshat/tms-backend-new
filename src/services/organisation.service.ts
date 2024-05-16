import OrganisationDao from "../dao/organisation.dao";
import OrganisationType from "../typings/organisation";
import OrganisationUserDao from "../dao/organisationUser.dao";

class OrganisationService {
  private organisationDao = new OrganisationDao()
  private organisationUserDao = new OrganisationUserDao()

  public fetchOrganisations = async (page: string = "", pageSize:string ="10", sortBy: string="-updatedAt") => {
    const totalEntries = await this.organisationDao.getTotalOrganisations()
    
    const data = await this.organisationDao.getOrganisations(page, pageSize, sortBy)
    return {totalEntries, data}
  }

  public fetchOrganisation = async (id: string) => {
     return await this.organisationDao.getOrganisation(id)
  }

  public postOrganisation = async (organisation: OrganisationType) => {
    organisation = {
      ...organisation,
      is_active: true
    }

    return await this.organisationDao.addOrganisation(organisation)
  }

  public updateOrganisation = async (id: string, organisation: OrganisationType) => {
    return await this.organisationDao.updateOrganisation(id, organisation)
  }

  public deleteOrganisation = async (id: string) => {
    await this.organisationUserDao.deleteOrganisationUserByOrgId(id)
    return await this.organisationDao.deleteOrganisation(id)
  }
}

export default OrganisationService