import { ILab } from './lab.model';

export interface ILabs {
  labs: ILab[];
  page: number;
  count: number;
  total: number;
}
