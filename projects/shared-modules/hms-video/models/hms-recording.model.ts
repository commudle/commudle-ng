export interface IHmsRecording {
  id: number;
  room_id: string;
  room_name: string;
  location: string;
  URL: string;
  generated_url: string;
  duration: number;
  size: number;
  session_id: string;
  created_at: Date;
  updated_at: Date;
}
