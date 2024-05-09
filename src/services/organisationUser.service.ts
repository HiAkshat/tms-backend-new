import OrganisationUserDao from "../dao/organisationUser.dao";
import titleCase from "../helpers/titleCase";

class OrganisationUserService {
  private organisationUserDao = new OrganisationUserDao()

  public fetchOrganisationUsers = async (requestBody: Object) => {
    return await this.organisationUserDao.getOrganisationUsers()
  }

  public fetchOrganisationUser = async (requestBody: Object) => {
     return await this.organisationUserDao.getOrganisationUser(requestBody)
  }

  public fetchOrganisationUserByOrgID = async (requestParams: Object) => {
    return await this.organisationUserDao.getOrganisationUserByOrgID(requestParams)
  }

  public fetchOrganisationUserByEmail = async (requestParams: Object) => {
    return await this.organisationUserDao.getOrganisationUserByEmail(requestParams)
  }

  public postOrganisationUser = async (requestBody: any) => {
    requestBody.first_name = titleCase(requestBody.first_name)
    requestBody.last_name = titleCase(requestBody.last_name)
    return await this.organisationUserDao.addOrganisationUser(requestBody)
  }

  public updateOrganisationUser = async (requestParams: Object, requestBody: Object) => {
    return await this.organisationUserDao.updateOrganisationUser(requestParams, requestBody)
  }

  public deleteOrganisationUser = async (requestParams: Object) => {
    return await this.organisationUserDao.deleteOrganisationUser(requestParams)
  }
}

export default OrganisationUserService