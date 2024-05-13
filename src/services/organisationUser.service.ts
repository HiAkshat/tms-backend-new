import OrganisationUserDao from "../dao/organisationUser.dao";

import OtpHelper from "../helpers/Otp.helper";
import TitleCaseHelper from "../helpers/titleCase.helper";
import OrganisationUserType from "../typings/organisationUser";

class OrganisationUserService {
  private organisationUserDao = new OrganisationUserDao()
  private otpHelper = new OtpHelper()

  public fetchOrganisationUsers = async (page: string="1", pageSize: string="10") => {
    const totalEntries = await this.organisationUserDao.getTotalOrganisationUsers()
    const data = await this.organisationUserDao.getOrganisationUsers(page, pageSize)
    return {totalEntries, data}
  }

  public fetchOrganisationUser = async (id: string) => {
     return await this.organisationUserDao.getOrganisationUser(id)
  }

  public fetchOrganisationUserByOrgID = async (id: string) => {
    return await this.organisationUserDao.getOrganisationUserByOrgID(id)
  }

  public fetchOrganisationUserByEmail = async (email_id: string) => {
    return await this.organisationUserDao.getOrganisationUserByEmail(email_id)
  }

  public postOrganisationUser = async (organisation_user: OrganisationUserType) => {
    const titleCaseHelper = new TitleCaseHelper()
    
    organisation_user.first_name = titleCaseHelper.titleCase(organisation_user.first_name)
    organisation_user.last_name = titleCaseHelper.titleCase(organisation_user.last_name)

    return await this.organisationUserDao.addOrganisationUser(organisation_user)
  }

  public updateOrganisationUser = async (id: string, organisation_user: OrganisationUserType) => {
    return await this.organisationUserDao.updateOrganisationUser(id, organisation_user)
  }

  public deleteOrganisationUser = async (id: string) => {
    return await this.organisationUserDao.deleteOrganisationUser(id)
  }

  public sendOtp = async (email_id: string) => {
    try {
      const user = await this.fetchOrganisationUserByEmail(email_id)
      if (!user){
        throw new Error("User not found!")
      }
  
      const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
      console.log(otp)
      var dt1 = (new Date()).getTime()
      
      const otp_details = {
        otp: otp,
        otpExpiration: new Date(dt1+900000)
      }
  
      await this.organisationUserDao.updateOtpDetails(user.email_id, otp_details)
      return await this.otpHelper.sendOTP(user.email_id, otp)
    } catch (error) {
      throw error
    }
  }

  public verifyOtp = async (requestBody: {email_id: string, otp: number}) => {
    try {
      const user = await this.organisationUserDao.getOrganisationUserByEmail(requestBody.email_id)
      if (!user) throw new Error("User not found!")
      const res = await this.otpHelper.verifyOtp(requestBody.otp, user)
      return res
    } catch (error) {
      throw error
    }
  }
}

export default OrganisationUserService