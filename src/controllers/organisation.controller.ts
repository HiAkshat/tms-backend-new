import { NextFunction, Request, Response } from "express";
import OrganisationService from "../services/organisation.service";
import CustomError from "../utils/customError";

class OrganisationController {
  public organisationService = new OrganisationService()

  public getOrganisations = async (req: Request<{}, {}, {}, {page: string, pageSize: string, sortBy: string|undefined}>, res: Response, next: NextFunction): Promise<void> => {
    const {page, pageSize, sortBy} = req.query

    try {
      const responseBody = await this.organisationService.fetchOrganisations(page?.toString(), pageSize?.toString(), sortBy)
      res.status(200).json(responseBody)
    } catch (error: any) {
      const err = new CustomError(error.message, 400)
      next(err)
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
    } catch (error: any) {
      const err = new CustomError(error.message, 400)
      next(err)
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