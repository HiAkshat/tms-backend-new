import SystemUserDao from "../dao/systemUser.dao";
import OtpHelper from "../helpers/Otp.helper";
import titleCase from "../helpers/titleCase.helper";

import TitleCaseHelper from "../helpers/titleCase.helper";
import SystemUserType from "../typings/systemUser";

class SystemUserService {
  private systemUserDao = new SystemUserDao()
  private otpHelper = new OtpHelper()

  public fetchSystemUsers = async () => {
    return await this.systemUserDao.getSystemUsers()
  }

  public fetchSystemUser = async (id: string) => {
     return await this.systemUserDao.getSystemUser(id)
  }

  public fetchSystemUserByEmail = async (email_id: string) => {
    return await this.systemUserDao.getSystemUserByEmail(email_id)
  }

  public postSystemUser = async (system_user: SystemUserType) => {
    const titleCaseHelper = new TitleCaseHelper()

    system_user.first_name = titleCaseHelper.titleCase(system_user.first_name)
    system_user.last_name = titleCaseHelper.titleCase(system_user.last_name)
    
    return await this.systemUserDao.addSystemUser(system_user)
  }

  public updateSystemUser = async (id: string, system_user: SystemUserType) => {
    return await this.systemUserDao.updateSystemUser(id, system_user)
  }

  public deleteSystemUser = async (id: string) => {
    return await this.systemUserDao.deleteSystemUser(id)
  }

  public sendOtp = async (email_id: string) => {
    try {
      const user = await this.fetchSystemUserByEmail(email_id)
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

      await this.systemUserDao.updateOtpDetails(user.email_id, otp_details)
      const res = await this.otpHelper.sendOTP(user.email_id, otp)
      return {res: res}
      
    } catch (error) {
      throw error
    }
  }

  public verifyOtp = async (requestBody: {email_id: string, otp: number}) => {
    try {
      const user = await this.systemUserDao.getSystemUserByEmail(requestBody.email_id)
      if (!user) throw new Error("User not found!")
      const res = await this.otpHelper.verifyOtp(requestBody.otp, user)
      return res
    } catch (error) {
      throw error
    }
  }
}

export default SystemUserService