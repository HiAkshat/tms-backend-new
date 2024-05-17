import {Router} from "express"

import OrganisationController from "../controllers/organisation.controller"
import OrganisationUserController from "../controllers/organisationUser.controller"
import SystemUserController from "../controllers/systemUser.controller"
import TicketController from "../controllers/ticket.controller"
import CommentController from "../controllers/comment.controller"

import Uploader from "../middlewares/uploader"
import path from "path"

import { Request, Response } from "express"

class Routes{
  public router = Router()

  public organisationPath = "/organisation"
  public organisationUserPath = "/organisationUser"
  public systemUserPath = "/systemUser"
  public ticketPath = "/ticket"
  public commentPath = "/comment"


  public organisationController = new OrganisationController()
  public organisationUserController = new OrganisationUserController()
  public systemUserController = new SystemUserController()
  public ticketController = new TicketController()
  public commentController = new CommentController()

  public uploader = new Uploader()

  constructor(){
    this.initializeOrganisationRoutes(`${this.organisationPath}`)
    this.initializeOrganisationUserRoutes(`${this.organisationUserPath}`)
    this.initializeSystemUserRoutes(`${this.systemUserPath}`)
    this.initializeTicketRoutes(`${this.ticketPath}`)
    this.initializeCommentRoutes(`${this.commentPath}`)
  }


  private initializeOrganisationRoutes(prefix: string) {
    // GET
    this.router.get(`${prefix}`, this.organisationController.getOrganisations)
    this.router.get(`${prefix}/:id`, this.organisationController.getOrganisation)

    // POST
    this.router.post(`${prefix}`, this.organisationController.addOrganisation)

    // PUT
    this.router.put(`${prefix}/:id`, this.organisationController.udpateOrganisation)
    
    // DELETE
    this.router.delete(`${prefix}/:id`, this.organisationController.deleteOrganisation)
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
    this.router.post(`${prefix}/verifyOtp`, this.organisationUserController.verifyOtp)
    
    // DELETE
    this.router.put(`${prefix}/:id`, this.organisationUserController.deleteOrganisationUser)
    this.router.put(`${prefix}/removeOrganisation/:user_id`, this.organisationUserController.deleteOrganisationFromUser)
    
    // PUT
    this.router.put(`${prefix}/:id`, this.organisationUserController.updateOrganisationUser)
    this.router.put(`${prefix}/addOrganisation/:id`, this.organisationUserController.addOrganisationToOrganisationUser)
  }


  private initializeSystemUserRoutes(prefix: string){
    // GET
    this.router.get(`${prefix}`, this.systemUserController.getSystemUsers)
    this.router.get(`${prefix}/:id`, this.systemUserController.getSystemUser)
    this.router.get(`${prefix}/email/:email_id`, this.systemUserController.getSystemUserByEmail)
    
    // post
    this.router.post(`${prefix}`, this.systemUserController.addSystemUser)
    this.router.post(`${prefix}/sendOtp/:email_id`, this.systemUserController.sendOtp)
    this.router.post(`${prefix}/verifyOtp`, this.systemUserController.verifyOtp)
    
    // DELETE
    this.router.delete(`${prefix}/:id`, this.systemUserController.deleteSystemUser)
    
    // PUT
    this.router.put(`${prefix}/:id`, this.systemUserController.updateSystemUser)
  }


  private initializeTicketRoutes(prefix: string){
    // GET
    this.router.get(`${prefix}/organisation/:id`, this.ticketController.getOrgTickets)
    this.router.get(`${prefix}/:id`, this.ticketController.getTicket)

    this.router.get(`${prefix}/download/:filename`, async (req: Request, res: Response) => {
      const filename = req.params.filename
      console.log(req.params)
      const filepath = path.join(__dirname, "../../public/uploads", filename)
      console.log("HEYY")
      console.log(filepath)

      res.download(filepath, filename, err => {
        if (err)
          res.status(500).send("FILE NOT FOUND!")
      })
    })

    // POST
    this.router.post(`${prefix}/`, this.ticketController.addTicket)

    this.router.post(`${prefix}/upload`, this.uploader.upload.single("file"), async (req: Request, res: Response) => {
      if (!req.file) {
        res.status(413).send(`File not uploaded!, Please attach jpeg file under 5 MB`);
        return;
      }
      
      // successfull completion
      res.status(201).json({filename: req.file.filename, message: "Files uploaded successfully"});
    })

    // PUT
    this.router.put(`${prefix}/:id`, this.ticketController.updateTicket)

    // DELETE
    this.router.delete(`${prefix}/:id`, this.ticketController.deleteTicket)
  }


  private initializeCommentRoutes(prefix: string) {
    // GET
    this.router.get(`${prefix}/:ticket_id`, this.commentController.getComments)

    // POST
    this.router.post(`${prefix}`, this.commentController.addComment)
    
    // DELETE
    this.router.delete(`${prefix}/:id`, this.commentController.deleteComment)
  }
}

export default Routes