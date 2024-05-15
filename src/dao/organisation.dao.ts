import organisationModel from "../models/organisation.model";
import OrganisationType from "../typings/organisation";

class OrganisationDao {
  public getOrganisations = async (page: string, pageSize: string) => {
    const pageNum = parseInt(page) || 1;
    const pageSizeNum = parseInt(pageSize) || 10;
    const skip = (pageNum - 1) * pageSizeNum;

    return await organisationModel.find({}).skip(skip).limit(pageSizeNum)
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
    return await organisationModel.findByIdAndDelete(id)
  }
}

export default OrganisationDao