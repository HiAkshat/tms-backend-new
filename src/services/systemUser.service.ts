import SystemUserDao from "../dao/systemUser.dao";
import OtpHelper from "../helpers/Otp.helper";
import titleCase from "../helpers/titleCase.helper";

import TitleCaseHelper from "../helpers/titleCase.helper";

class SystemUserService {
  private systemUserDao = new SystemUserDao()
  private otpHelper = new OtpHelper()

  public fetchSystemUsers = async (requestBody: Object) => {
    console.log("HEYINSERVICE")

    return await this.systemUserDao.getSystemUsers()
  }

  public fetchSystemUser = async (requestBody: Object) => {
     return await this.systemUserDao.getSystemUser(requestBody)
  }

  public fetchSystemUserByEmail = async (requestParams: Object) => {
    return await this.systemUserDao.getSystemUserByEmail(requestParams)
  }

  public postSystemUser = async (requestBody: any) => {
    const titleCaseHelper = new TitleCaseHelper()
    requestBody.first_name = titleCaseHelper.titleCase(requestBody.first_name)
    requestBody.last_name = titleCaseHelper.titleCase(requestBody.last_name)
    return await this.systemUserDao.addSystemUser(requestBody)
  }

  public updateSystemUser = async (requestParams: Object, requestBody: Object) => {
    return await this.systemUserDao.updateSystemUser(requestParams, requestBody)
  }

  public deleteSystemUser = async (requestParams: Object) => {
    return await this.systemUserDao.deleteSystemUser(requestParams)
  }

  public sendOtp = async (requestParams: any) => {
    const user = await this.fetchSystemUserByEmail(requestParams)
    if (!user){
      throw new Error("User not found!")
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    var dt1 = (new Date()).getTime()
    
    // { email_id, first_name, last_name, dob, organisation, joining_date }
    const newUserData = {
      email_id: user.email_id,
      first_name: user.first_name,
      last_name: user.last_name,
      otp,
      otpExpiration: new Date(dt1+900000)
    }

    await this.systemUserDao.updateSystemUser({id: user._id}, newUserData)
    const res = await this.otpHelper.sendOTP(user.email_id, otp)
    return {res: res}
  }

  public verifyOtp = async (requestBody: any) => {
    try {
      const user = await this.systemUserDao.getSystemUserByEmail(requestBody)
      if (!user) throw new Error("User not found!")
      const res = await this.otpHelper.verifyOtp(requestBody.otp, user)
      return res
    } catch (error) {
      throw error
    }
  }
}

export default SystemUserService