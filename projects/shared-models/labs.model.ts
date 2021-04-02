import { IAttachedFile } from './attached-file.model';
import { IUser } from './user.model';
import { ILabStep } from './lab-step.model';
import { ILab } from './lab.model';

export interface ILabs {
  labs: ILab[];
  page: number;
  count: number;
  total: number;
}
