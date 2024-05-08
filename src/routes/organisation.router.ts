import {Router} from "express"
import OrganisationController from "../controllers/organisation.controller"

class Routes{
  public organisationPath = "/organisation"
  public router = Router()
  public organisationController = new OrganisationController()

  constructor(){
    this.initializeOrganisationRoutes(`${this.organisationPath}`)
  }

  private initializeOrganisationRoutes(prefix: string){
    this.router.get(`${prefix}`, this.organisationController.getOrganisations)
    this.router.get(`${prefix}/:id`, this.organisationController.getOrganisation)
  }
}

export default Routes