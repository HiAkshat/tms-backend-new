import OrganisationUserDao from "../dao/organisationUser.dao";

import OtpHelper from "../helpers/Otp";
import TitleCaseHelper from "../helpers/titleCase";

class OrganisationUserService {
  private organisationUserDao = new OrganisationUserDao()

  public fetchOrganisationUsers = async (requestBody: Object) => {
    return await this.organisationUserDao.getOrganisationUsers()
  }

  public fetchOrganisationUser = async (requestBody: Object) => {
     return await this.organisationUserDao.getOrganisationUser(requestBody)
  }

  public fetchOrganisationUserByOrgID = async (requestParams: Object) => {
    return await this.organisationUserDao.getOrganisationUserByOrgID(requestParams)
  }

  public fetchOrganisationUserByEmail = async (requestParams: Object) => {
    return await this.organisationUserDao.getOrganisationUserByEmail(requestParams)
  }

  public postOrganisationUser = async (requestBody: any) => {
    const titleCaseHelper = new TitleCaseHelper()
    requestBody.first_name = titleCaseHelper.titleCase(requestBody.first_name)
    requestBody.last_name = titleCaseHelper.titleCase(requestBody.last_name)
    return await this.organisationUserDao.addOrganisationUser(requestBody)
  }

  public updateOrganisationUser = async (requestParams: Object, requestBody: Object) => {
    return await this.organisationUserDao.updateOrganisationUser(requestParams, requestBody)
  }

  public deleteOrganisationUser = async (requestParams: Object) => {
    return await this.organisationUserDao.deleteOrganisationUser(requestParams)
  }

  public sendOtp = async (requestParams: any) => {
    const user = await this.fetchOrganisationUserByEmail(requestParams)
    if (!user){
      throw new Error("User not found!")
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
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

    await this.organisationUserDao.updateOrganisationUser({id: user._id}, newUserData)
    const otpHelper = new OtpHelper()
    const res = await otpHelper.sendOTP(user.email_id, otp)
    return {res: res}
  }
}

export default OrganisationUserService