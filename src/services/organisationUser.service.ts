import OrganisationUserDao from "../dao/organisationUser.dao";

import OtpHelper from "../helpers/Otp.helper";
import TitleCaseHelper from "../helpers/titleCase.helper";

import OrganisationUserType, { RecieveOrganisationUserType } from "../typings/organisationUser";

import { v4 as uuidv4 } from 'uuid';

class OrganisationUserService {
  private organisationUserDao = new OrganisationUserDao()
  private otpHelper = new OtpHelper()

  public fetchOrganisationUsers = async (page: string="", pageSize: string="10", sortBy: string="-updatedAt") => {
    const totalEntries = await this.organisationUserDao.getTotalOrganisationUsers()
    console.log("INSIDE SERVICE")
    const data = await this.organisationUserDao.getOrganisationUsers(page, pageSize, sortBy)
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

  public postOrganisationUser = async (organisation_user: RecieveOrganisationUserType) => {
    const titleCaseHelper = new TitleCaseHelper()
    
    organisation_user.first_name = titleCaseHelper.titleCase(organisation_user.first_name)
    organisation_user.last_name = titleCaseHelper.titleCase(organisation_user.last_name)

    const data = {
      unique_id: uuidv4(),
      email_id: organisation_user.email_id,
      first_name: organisation_user.first_name,
      last_name: organisation_user.last_name,
      dob: organisation_user.dob,
      organisations: [{
        organisation_id: organisation_user.organisation,
        joining_date: organisation_user.joining_date
      }],
      is_active: true
    }

    return await this.organisationUserDao.addOrganisationUser(data)
  }

  public addOrganisationToOrganisationUser = async (id: string, organisation_id: string, joining_date: Date) => {
    const data = {
      organisation_id, joining_date
    }

    return await this.organisationUserDao.addOrganisationToOrganisationUser(id, data)
  }

  public updateOrganisationUser = async (id: string, organisation_user: OrganisationUserType) => {
    return await this.organisationUserDao.updateOrganisationUser(id, organisation_user)
  }

  public deleteOrganisationFromUser = async (user_id: string, organisation_id: string) => {
    return await this.organisationUserDao.deleteOrganisationFromUser(user_id, organisation_id)
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

  public verifyOtp = async (requestBody: {email_id: string, organisation_id: string, otp: number}) => {
    try {
      const user = await this.organisationUserDao.getOrganisationUserByEmailAndOrg(requestBody.email_id, requestBody.organisation_id)
      // const user = await User.findOne({
      //   _id: userId,
      //   'organisations.organizationId': organisationId
      // });

      if (!user) throw new Error("User not found!")
      const res = await this.otpHelper.verifyOtp(requestBody.otp, user)
      return res
    } catch (error) {
      throw error
    }
  }
}

export default OrganisationUserService