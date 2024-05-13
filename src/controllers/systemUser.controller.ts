import { NextFunction, Request, Response } from "express";
import SystemUserService from "../services/systemUser.service";

class SystemUserController {
  public systemUserService = new SystemUserService()

  public getSystemUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const responseBody = await this.systemUserService.fetchSystemUsers()
      res.status(200).json(responseBody)
      console.log("SystemUsers retrieved!")
    } catch (error) {
      res.status(400).json({error})
    }
  }

  public getSystemUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {id} = req.params
    try {
      const responseBody = await this.systemUserService.fetchSystemUser(id)
      res.status(200).json(responseBody)
      console.log("System user data retrieved!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public getSystemUserByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {email_id} = req.params
    try {
      const responseBody = await this.systemUserService.fetchSystemUserByEmail(email_id)
      res.status(200).json(responseBody)
      console.log("System user data retrieved!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public addSystemUser = async (req: Request, res:Response, next: NextFunction): Promise<void> => {
    const system_user = req.body
    try {
      const responseBody = await this.systemUserService.postSystemUser(system_user)
      res.status(200).json(responseBody)
      console.log("System user added!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public updateSystemUser = async (req: Request, res:Response, next: NextFunction): Promise<void> => {
    const {id} = req.params
    const system_user = req.body
    try {
      const responseBody = await this.systemUserService.updateSystemUser(id, system_user)
      res.status(200).json(responseBody)
      console.log("System user updated!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public deleteSystemUser = async (req: Request, res:Response, next: NextFunction): Promise<void> => {
    const {id} = req.params
    try {
      const responseBody = await this.systemUserService.deleteSystemUser(id)
      res.status(200).json(responseBody)
      console.log("System user deleted!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public sendOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {email_id} = req.params
    try {
      const responseBody = await this.systemUserService.sendOtp(email_id)
      res.status(200).json(responseBody)
    } catch (error: any) {
      res.status(400).json({success: false, message: error.message})
    }
  }

  public verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const requestBody = req.body
    try {
      const responseBody = await this.systemUserService.verifyOtp(requestBody)
      if (responseBody.valid) res.status(200).json(responseBody)
      else res.status(400).json(responseBody)
    } catch (error) {
      res.status(400).json({error})
    }
  }

}

 export default SystemUserController