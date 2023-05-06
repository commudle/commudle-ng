export interface IPagination<T> {
  page: Array<{ cursor: string; data: T }>;
  page_info: IPageInfo;
  total: number;
}

export interface IPageInfo {
  has_previous_page: boolean;
  has_next_page: boolean;
  start_cursor: string;
  end_cursor: string;
}
