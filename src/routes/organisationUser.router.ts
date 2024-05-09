import {Router} from "express"
import OrganisationUserController from "../controllers/organisationUser.controller"

class OrganisationUserRoutes{
  public organisationUserPath = "/organisationUser"
  public router = Router()
  public organisationUserController = new OrganisationUserController()

  constructor(){
    this.initializeOrganisationUserRoutes(`${this.organisationUserPath}`)
  }

  private initializeOrganisationUserRoutes(prefix: string){
    // GET
    this.router.get(`${prefix}`, this.organisationUserController.getOrganisationUsers)
    this.router.get(`${prefix}/:id`, this.organisationUserController.getOrganisationUser)
    // post
    this.router.put(`${prefix}/:id`, this.organisationUserController.updateOrganisationUser)
    this.router.post(`${prefix}`, this.organisationUserController.addOrganisationUser)
    // DELETE
    this.router.delete(`${prefix}/:id`, this.organisationUserController.deleteOrganisationUser)
    // PUT
    this.router.get(`${prefix}/organisation/:id`, this.organisationUserController.getOrganisationUserByOrgID)
    
    this.router.get(`${prefix}/email/:email_id`, this.organisationUserController.getOrganisationUserByEmail)
  }
}

export default OrganisationUserRoutes