import {Router} from "express"
import SystemUserController from "../controllers/systemUser.controller"

class SystemUserRoutes{
  public systemUserPath = "/systemUser"
  public router = Router()
  public systemUserController = new SystemUserController()

  constructor(){
    this.initializeSystemUserRoutes(`${this.systemUserPath}`)
  }

  private initializeSystemUserRoutes(prefix: string){
    // GET
    this.router.get(`${prefix}`, this.systemUserController.getSystemUsers)
    this.router.get(`${prefix}/:id`, this.systemUserController.getSystemUser)
    this.router.get(`${prefix}/email/:email_id`, this.systemUserController.getSystemUserByEmail)
    // post
    this.router.post(`${prefix}`, this.systemUserController.addSystemUser)
    this.router.post(`${prefix}/sendOtp/:email_id`, this.systemUserController.sendOtp)
    // DELETE
    this.router.delete(`${prefix}/:id`, this.systemUserController.deleteSystemUser)
    // PUT
    this.router.put(`${prefix}/:id`, this.systemUserController.updateSystemUser)
    
  }
}

export default SystemUserRoutes