import organisationUserModel from "../models/organisationUser.model";
import OrganisationUserModel from "../models/organisationUser.model";
import OrganisationUserType from "../typings/organisationUser";

class OrganisationUserDao {
  public getOrganisationUsers = async (page: string, pageSize: string, sortBy: string) => {
    if (page){
      const pageNum = parseInt(page) || 1;
      const pageSizeNum = parseInt(pageSize) || 10;
      const skip = (pageNum - 1) * pageSizeNum;

      return await OrganisationUserModel.find({is_active: true}).sort(sortBy).skip(skip).limit(pageSizeNum)
    }

    return await OrganisationUserModel.find({is_active: true}).sort(sortBy)
  }

  public getTotalOrganisationUsers = async () => {
    return await organisationUserModel.countDocuments({is_active: true});
  }

  public getOrganisationUser = async (id: string) => {
    return await OrganisationUserModel.findOne({unique_id: id})
  }
  
  public getOrganisationUserByEmail = async (email_id: string) => {
    return await OrganisationUserModel.findOne({email_id})
  }

  public getOrganisationUserByEmailAndOrg = async (email_id: string, organisation_id: string) => {
    return await organisationUserModel.findOne({
      email_id: email_id,
      'organisations.organisation_id': organisation_id
    });
  }

  public getOrganisationUserByOrgID = async (id: string) => {
    return await OrganisationUserModel.find({"organisations.organisation_id": id})
  }

  public addOrganisationUser = async (organisation_user: OrganisationUserType) => {
    return await OrganisationUserModel.create(organisation_user)
  }

  public addOrganisationToOrganisationUser = async (id: string, new_organisation: {organisation_id: string, joining_date: Date}) => {
    return await organisationUserModel.updateOne(
      {unique_id: id},
      {$push: {organisations: new_organisation}}
    )
  }

  public updateOrganisationUser = async (id: string, organisation_user: OrganisationUserType) => {
    return await organisationUserModel.updateOne(
      {unique_id: id},
      {
        $set: organisation_user
      }
    )
  }

  public updateOtpDetails = async (email_id: string, otp_details:  {otp: number, otpExpiration: Date}) => {
    console.log(email_id, otp_details)
    return await OrganisationUserModel.updateOne(
      {email_id: email_id},
      {
        $set: {
          otp: otp_details.otp,
          otpExpiration: otp_details.otpExpiration
        }
      }
    )
  }

  public deleteOrganisationUser = async (id: string) => {
    return await OrganisationUserModel.updateOne(
      {unique_id: id},
      {
        $set: {
          is_active: false
        }
      }
    )
  }

  public deleteOrganisationFromUser = async (user_id: string, organisation_id: string) => {
    console.log(user_id, organisation_id)
    const res = await organisationUserModel.updateOne(
      {unique_id: user_id},
      {
        $pull: { organisations: { organisation_id: organisation_id } }
      }
    )

    console.log(`${res.modifiedCount} user(s) updated`);
    return res
  }

  public deleteOrganisationFromAllUsers = async (id: string) => {
    const res = await organisationUserModel.updateMany(
      {"organisations.organisation_id": id},
      {
        $pull: { organisations: { organisation_id: id } }
      }
    )

    console.log(`${res.modifiedCount} user(s) updated`);
    return res
  }
 
}

export default OrganisationUserDao