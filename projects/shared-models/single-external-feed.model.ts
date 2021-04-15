export interface ISingleExternalFeed {
  id: number;
  details: Details;
}

interface Details {
  source: string;
  link: string;
  title: string;
  image: string;
  tags: Tag[];
}

interface Tag {
  name: string;
}
