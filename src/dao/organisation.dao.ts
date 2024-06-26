import organisationModel from "../models/organisation.model";
import OrganisationType from "../typings/organisation";

class OrganisationDao {
  public getOrganisations = async (page: string, pageSize: string, sortColumn: string="-updatedAt") => {
    if (page){
      const pageNum = parseInt(page);
      const pageSizeNum = parseInt(pageSize) || 10;
      const skip = (pageNum - 1) * pageSizeNum;
      
      return await organisationModel.find({is_active: true}).sort(sortColumn).skip(skip).limit(pageSizeNum)
    }

    else return await organisationModel.find({is_active: true})

  }

  public getTotalOrganisations = async () => {
    return await organisationModel.countDocuments({});
  }

  public getOrganisation =  async (id: string) => {
    return await organisationModel.findById(id)
  }

  public addOrganisation = async (organisation: OrganisationType) => {
    return await organisationModel.create(organisation)
  }

  public updateOrganisation = async (id: string, organisation: OrganisationType) => {
    return await organisationModel.findByIdAndUpdate(id, organisation, {new: true})
  }

  public deleteOrganisation = async (id: string) => {
    return await organisationModel.updateOne(
      {_id: id},
      {
        $set: {
          is_active: false
        }
      }
    )
  }
}

export default OrganisationDao