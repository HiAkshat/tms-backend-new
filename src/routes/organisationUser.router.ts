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
    this.router.get(`${prefix}/email/:email_id`, this.organisationUserController.getOrganisationUserByEmail)
    this.router.get(`${prefix}/organisation/:id`, this.organisationUserController.getOrganisationUserByOrgID)
    
    // POST
    this.router.post(`${prefix}`, this.organisationUserController.addOrganisationUser)
    this.router.post(`${prefix}/sendOtp/:email_id`, this.organisationUserController.sendOtp)
    
    // DELETE
    this.router.delete(`${prefix}/:id`, this.organisationUserController.deleteOrganisationUser)
    
    // PUT
    this.router.put(`${prefix}/:id`, this.organisationUserController.updateOrganisationUser)
    
  }
}

export default OrganisationUserRoutes