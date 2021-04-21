export interface IFeedItem {
  id: number;
  details: Details;
  messages_count: number;
}

interface Details {
  source: string;
  source_logo:string;
  link: string;
  title: string;
  image: string;
  created_at: string;
  tags: Tag[];
}

interface Tag {
  name: string;
}
