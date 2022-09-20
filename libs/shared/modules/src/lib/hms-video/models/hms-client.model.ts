import { EHmsRoles } from '../enums/hms-roles.enum';

export interface IHmsClient {
  token: string;
  role: EHmsRoles;
}
