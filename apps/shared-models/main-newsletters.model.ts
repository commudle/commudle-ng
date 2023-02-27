import { IMainNewsletter } from "./main-newsletter.model";

export interface IMainNewsletters {
  main_newsletters: IMainNewsletter[];
  page: number;
  count: number;
  total: number;
}
