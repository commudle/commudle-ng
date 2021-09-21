import { EHmsRoles } from 'projects/shared-modules/hms-video/enums/hms-roles.enum';

export interface IHmsClient {
  token: string;
  role: EHmsRoles;
}
