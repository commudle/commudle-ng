import { IYoutubeStream } from './youtube-stream.model';

export interface IYoutubeBroadcast {
  id: number;
  broadcast_id: string;
  title: string;
  scheduled_start_time: Date;
  privacy_status: string;
  created_at: Date;
  youtube_streams: IYoutubeStream[];
}
