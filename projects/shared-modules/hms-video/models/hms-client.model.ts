import { EHmsRoles } from "../components/enums/hms-roles.enum";

export interface IHmsClient {
  token: string;
  role: EHmsRoles;
}
