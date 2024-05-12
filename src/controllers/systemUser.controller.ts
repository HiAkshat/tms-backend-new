import { NextFunction, Request, Response } from "express";
import SystemUserService from "../services/systemUser.service";

class SystemUserController {
  public systemUserService = new SystemUserService()

  public getSystemUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const requestQuery = req.query

    try {
      console.log("HEYINCONTROLLER")

      const responseBody = await this.systemUserService.fetchSystemUsers(requestQuery)
      res.status(200).json(responseBody)
      console.log("SystemUsers retrieved!")
    } catch (error) {
      res.status(400).json({error})
    }
  }

  public getSystemUser = async (req: Request<{}>, res: Response, next: NextFunction): Promise<void> => {
    const requestParams = req.params
    try {
      const responseBody = await this.systemUserService.fetchSystemUser(requestParams)
      res.status(200).json(responseBody)
      console.log("System user data retrieved!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public getSystemUserByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const requestParams = req.params
    try {
      const responseBody = await this.systemUserService.fetchSystemUserByEmail(requestParams)
      res.status(200).json(responseBody)
      console.log("System user data retrieved!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public addSystemUser = async (req: Request, res:Response, next: NextFunction): Promise<void> => {
    const requestBody = req.body
    try {
      const responseBody = await this.systemUserService.postSystemUser(requestBody)
      res.status(200).json(responseBody)
      console.log("System user added!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public updateSystemUser = async (req: Request, res:Response, next: NextFunction): Promise<void> => {
    const requestBody = req.body
    const requestParams = req.params
    try {
      const responseBody = await this.systemUserService.updateSystemUser(requestParams, requestBody)
      res.status(200).json(responseBody)
      console.log("System user updated!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public deleteSystemUser = async (req: Request, res:Response, next: NextFunction): Promise<void> => {
    const requestParams = req.params
    try {
      const responseBody = await this.systemUserService.deleteSystemUser(requestParams)
      res.status(200).json(responseBody)
      console.log("System user deleted!")
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public sendOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const requestParams = req.params
    try {
      const responseBody = await this.systemUserService.sendOtp(requestParams)
      res.status(200).json(responseBody)
    } catch (error) {
      res.status(400).json(error)
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