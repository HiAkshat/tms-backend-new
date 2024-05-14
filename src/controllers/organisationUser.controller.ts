import { NextFunction, Request, Response } from "express";
import OrganisationUserService from "../services/organisationUser.service";
import { Error } from "mongoose";

class OrganisationUserController {
  public organisationUserService = new OrganisationUserService()

  public getOrganisationUsers = async (req: Request , res: Response, next: NextFunction): Promise<void> => {
    const {page, pageSize} = req.query

    try {
      const responseBody = await this.organisationUserService.fetchOrganisationUsers(page?.toString(), pageSize?.toString())
      res.status(200).json(responseBody)
      console.log("Organisation Users retrieved!")
    } catch (error) {
      res.status(400).json({error})
    }
  }

  public getOrganisationUser = async (req: Request , res: Response, next: NextFunction): Promise<void> => {
    const {id} = req.params
    try {
      const responseBody = await this.organisationUserService.fetchOrganisationUser(id)
      res.status(200).json(responseBody)
      console.log("Organisation User data retrieved!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public getOrganisationUserByOrgID = async (req: Request , res: Response, next: NextFunction): Promise<void> => {
    const {id} = req.params
    try {
      const responseBody = await this.organisationUserService.fetchOrganisationUserByOrgID(id)
      res.status(200).json(responseBody)
      console.log("Organisation User data retrieved!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public getOrganisationUserByEmail = async (req: Request , res: Response, next: NextFunction): Promise<void> => {
    const {email_id} = req.params
    try {
      const responseBody = await this.organisationUserService.fetchOrganisationUserByEmail(email_id)
      res.status(200).json(responseBody)
      console.log("Organisation User data retrieved!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public addOrganisationUser = async (req: Request , res:Response, next: NextFunction): Promise<void> => {
    const organisation_user = req.body
    try {
      const responseBody = await this.organisationUserService.postOrganisationUser(organisation_user)
      res.status(200).json(responseBody)
      console.log("Organisation User added!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public updateOrganisationUser = async (req: Request , res:Response, next: NextFunction): Promise<void> => {
    const {id} = req.params
    const organisation_user = req.body

    try {
      const responseBody = await this.organisationUserService.updateOrganisationUser(id, organisation_user)
      res.status(200).json(responseBody)
      console.log("Organisation User updated!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public deleteOrganisationUser = async (req: Request , res:Response, next: NextFunction): Promise<void> => {
    const {id} = req.params
    try {
      const responseBody = await this.organisationUserService.deleteOrganisationUser(id)
      res.status(200).json(responseBody)
      console.log("Organisation User deleted!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public sendOtp = async (req: Request , res: Response, next: NextFunction) => {
    const {email_id} = req.params
    try {
      const responseBody = await this.organisationUserService.sendOtp(email_id)
      return res.status(200).json(responseBody)
    } catch (error: any) {
      return res.status(400).json({success: false, message: error.message})
    }
  }

  public verifyOtp = async (req: Request , res: Response, next: NextFunction): Promise<void> => {
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