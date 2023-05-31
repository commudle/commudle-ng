export interface ISessions {
  event: {
    id: string;
    name: string;
    start_time: Date;
    kommunity: {
      id: string;
    };
  };
  embedded_content: string;
  title: string;
}
