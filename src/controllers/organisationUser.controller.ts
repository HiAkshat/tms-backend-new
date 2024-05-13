import { NextFunction, Request, Response } from "express";
import OrganisationUserService from "../services/organisationUser.service";

class OrganisationUserController {
  public organisationUserService = new OrganisationUserService()

  public getOrganisationUsers = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const requestQuery = req.query

    try {
      const responseBody = await this.organisationUserService.fetchOrganisationUsers(requestQuery)
      res.status(200).json(responseBody)
      console.log("OrganisationUsers retrieved!")
    } catch (error) {
      res.status(400).json({error})
    }
  }

  public getOrganisationUser = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const requestParams = req.params
    try {
      const responseBody = await this.organisationUserService.fetchOrganisationUser(requestParams)
      res.status(200).json(responseBody)
      console.log("OrganisationUser data retrieved!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public getOrganisationUserByOrgID = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const requestParams = req.params
    try {
      const responseBody = await this.organisationUserService.fetchOrganisationUserByOrgID(requestParams)
      res.status(200).json(responseBody)
      console.log("OrganisationUser data retrieved!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public getOrganisationUserByEmail = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const requestParams = req.params
    try {
      const responseBody = await this.organisationUserService.fetchOrganisationUserByEmail(requestParams)
      res.status(200).json(responseBody)
      console.log("OrganisationUser data retrieved!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public addOrganisationUser = async (req: any, res:Response, next: NextFunction): Promise<void> => {
    const requestBody = req.body
    try {
      const responseBody = await this.organisationUserService.postOrganisationUser(requestBody)
      res.status(200).json(responseBody)
      console.log("OrganisationUser added!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public updateOrganisationUser = async (req: any, res:Response, next: NextFunction): Promise<void> => {
    const requestBody = req.body
    const requestParams = req.params
    try {
      const responseBody = await this.organisationUserService.updateOrganisationUser(requestParams, requestBody)
      res.status(200).json(responseBody)
      console.log("OrganisationUser updated!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public deleteOrganisationUser = async (req: any, res:Response, next: NextFunction): Promise<void> => {
    const requestParams = req.params
    try {
      const responseBody = await this.organisationUserService.deleteOrganisationUser(requestParams)
      res.status(200).json(responseBody)
      console.log("OrganisationUser deleted!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public sendOtp = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const requestParams = req.params
    try {
      const responseBody = await this.organisationUserService.sendOtp(requestParams)
      res.status(200).json(responseBody)
    } catch (error: any) {
      res.status(400).json({success: false, message: error.message})
    }
  }

  public verifyOtp = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const requestBody = req.body
    try {
      const responseBody = await this.organisationUserService.verifyOtp(requestBody)
      if (responseBody.valid) res.status(200).json(responseBody)
      else res.status(400).json(responseBody)
    } catch (error) {
      res.status(400).json({error})
    }
  }

}

 export default OrganisationUserController