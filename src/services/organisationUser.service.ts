import OrganisationUserDao from "../dao/organisationUser.dao";

import OtpHelper from "../helpers/Otp.helper";
import TitleCaseHelper from "../helpers/titleCase.helper";
import OrganisationUserType from "../typings/organisationUser";

class OrganisationUserService {
  private organisationUserDao = new OrganisationUserDao()
  private otpHelper = new OtpHelper()

  public fetchOrganisationUsers = async (requestQuery: {id: string}) => {
    const totalEntries = await this.organisationUserDao.getTotalOrganisationUsers()
    const data = await this.organisationUserDao.getOrganisationUsers(requestQuery)
    return {totalEntries, data}
  }

  public fetchOrganisationUser = async (requestBody: {id: string}) => {
     return await this.organisationUserDao.getOrganisationUser(requestBody)
  }

  public fetchOrganisationUserByOrgID = async (requestParams: {id: string}) => {
    return await this.organisationUserDao.getOrganisationUserByOrgID(requestParams)
  }

  public fetchOrganisationUserByEmail = async (requestParams: {email_id: string}) => {
    return await this.organisationUserDao.getOrganisationUserByEmail(requestParams)
  }

  public postOrganisationUser = async (requestBody: OrganisationUserType) => {
    const titleCaseHelper = new TitleCaseHelper()
    requestBody.first_name = titleCaseHelper.titleCase(requestBody.first_name)
    requestBody.last_name = titleCaseHelper.titleCase(requestBody.last_name)
    return await this.organisationUserDao.addOrganisationUser(requestBody)
  }

  public updateOrganisationUser = async (requestParams: {id: string}, requestBody: OrganisationUserType) => {
    return await this.organisationUserDao.updateOrganisationUser(requestParams, requestBody)
  }

  public deleteOrganisationUser = async (requestParams: {id: string}) => {
    return await this.organisationUserDao.deleteOrganisationUser(requestParams)
  }

  public sendOtp = async (requestParams: {email_id: string}) => {
    try {
      const user = await this.fetchOrganisationUserByEmail(requestParams)
      if (!user){
        throw new Error("User not found!")
      }
  
      const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
      console.log(otp)
      var dt1 = (new Date()).getTime()
      
      const newUserData = {
        email_id: user.email_id,
        first_name: user.first_name,
        last_name: user.last_name,
        organisation: user.organisation,
        joining_date: user.joining_date,
        otp,
        otpExpiration: new Date(dt1+900000)
      }
  
      await this.organisationUserDao.updateOrganisationUser({id: user._id.toString()}, newUserData)
  
      const res = await this.otpHelper.sendOTP(user.email_id, otp)
      return res
    } catch (error) {
      throw error
    }
  }

  public verifyOtp = async (requestBody: any) => {
    try {
      const user = await this.organisationUserDao.getOrganisationUserByEmail(requestBody)
      if (!user) throw new Error("User not found!")
      const res = await this.otpHelper.verifyOtp(requestBody.otp, user)
      return res
    } catch (error) {
      throw error
    }
  }
}

export default OrganisationUserService