import { ICommunityBuildSearch } from './community-build.model';
import { ICommunitySearch } from './community.model';
import { IEventSearch } from './event.model';
import { ILabSearch } from './lab.model';
import { IUserSearch } from './user.model';

export interface ISearch {
  results: ISearchResult[];
  page: number;
  count: number;
  total: number;
}

export type ISearchResult = IUserSearch | ILabSearch | ICommunitySearch | ICommunityBuildSearch | IEventSearch;
