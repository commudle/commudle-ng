export interface IHmsRecording {
  id: number;
  room_id: string;
  location: string;
  hms_event_id: string;
  generated_url: string;
  created_at: Date;
  updated_at: Date;
}
