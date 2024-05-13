import { NextFunction, Request, Response } from "express";
import OrganisationService from "../services/organisation.service";

class OrganisationController {
  public organisationService = new OrganisationService()

  public getOrganisations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {page, pageSize} = req.query

    try {
      const responseBody = await this.organisationService.fetchOrganisations(page?.toString(), pageSize?.toString())
      
      res.status(200).json(responseBody)
    } catch (error) {
      res.status(400).json({error})
    }
  }

  public getOrganisation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {id} = req.params
    try {
      const responseBody = await this.organisationService.fetchOrganisation(id)
      res.status(200).json(responseBody)
      console.log("Organisation data retrieved!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public addOrganisation = async (req: Request, res:Response, next: NextFunction): Promise<void> => {
    const organisation = req.body
    try {
      const responseBody = await this.organisationService.postOrganisation(organisation)
      res.status(200).json(responseBody)
      console.log("Organisation added!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public udpateOrganisation = async (req: Request, res:Response, next: NextFunction): Promise<void> => {
    const {id} = req.params
    const organisation = req.body
    try {
      const responseBody = await this.organisationService.updateOrganisation(id, organisation)
      res.status(200).json(responseBody)
      console.log("Organisation updated!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public deleteOrganisation = async (req: Request, res:Response, next: NextFunction): Promise<void> => {
    const {id} = req.params
    try {
      const responseBody = await this.organisationService.deleteOrganisation(id)
      res.status(200).json(responseBody)
      console.log("Organisation deleted!")
    } catch (error) {
      res.status(400).json(error)
    }
  }
}

 export default OrganisationController