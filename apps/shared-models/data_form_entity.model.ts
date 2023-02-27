export interface IDataFormEntity {
  id: number;
  name: number;
  slug: string;
  is_open: boolean;
  data_form_id: number;
  entity_type: string;
  entity_id: number;
  created_at: Date;
  visibility: Visibility;
  user_can_fill_form: boolean;
  multi_response: boolean;
  redirectable_entity_type: string;
  redirectable_entity_id: number;
}


export enum Visibility {
  YET_TO_ANNOUNCE = "yet_to_announce",
  OPEN_BUT_INVISIBLE = "open_but_invisible",
  OPEN = "open",
  MEMBERS_WHO_HAVE_ATTENDED = "members_who_have_attended",
  CLOSED = "closed",
  ON_THE_SPOT_UNINVITED = "on_the_spot_uninvited"
}
