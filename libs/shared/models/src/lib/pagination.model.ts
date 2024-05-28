export interface IPagination<T> {
  page: IPage<T>[];
  page_info: IPageInfo;
  total: number;
}

export interface IPage<T> {
  cursor: string;
  data: T;
}

export interface IPageInfo {
  has_previous_page: boolean;
  has_next_page: boolean;
  start_cursor: string;
  end_cursor: string;
}

export interface IPaginationCount<T> {
  values: T[];
  count: number;
  total: number;
  page: number;
}
