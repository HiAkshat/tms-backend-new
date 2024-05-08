import { NextFunction, Request, Response } from "express";
import OrganisationService from "../services/organisation.service";

class OrganisationController {
  public organisationService = new OrganisationService()

  public getOrganisations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const requestQuery = req.query

    try {
      const responseBody = await this.organisationService.fetchOrganisations(requestQuery)
      console.log(responseBody)
      res.status(200).json(responseBody)
    } catch (error) {
      res.status(400).json({error})
    }
  }

  public getOrganisation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const requestQuery = req.params
    try {
      const responseBody = await this.organisationService.fetchOrganisation(requestQuery)
      res.status(200).json(responseBody)
      console.log("Organisation data retrieved!")
    } catch (e) {
      res.status(400).json(e)
    }
  }

  // public addOrganisation = async (req: Request, res:)
}


 export default OrganisationController