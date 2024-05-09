import {Router} from "express"
import OrganisationController from "../controllers/organisation.controller"

class OrganisationRoutes{
  public organisationPath = "/organisation"
  public router = Router()
  public organisationController = new OrganisationController()

  constructor(){
    this.initializeOrganisationRoutes(`${this.organisationPath}`)
  }

  private initializeOrganisationRoutes(prefix: string) {
    this.router.get(`${prefix}`, this.organisationController.getOrganisations)
    this.router.get(`${prefix}/:id`, this.organisationController.getOrganisation)
    this.router.post(`${prefix}`, this.organisationController.addOrganisation)
    this.router.put(`${prefix}/:id`, this.organisationController.udpateOrganisation)
    this.router.delete(`${prefix}/:id`, this.organisationController.deleteOrganisation)
  }
}

export default OrganisationRoutes