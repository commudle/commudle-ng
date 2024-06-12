export interface IHelpDictionary {
  type: string;
  text: string;
  url: string;
}

export enum EHelpDictionaryType {
  TEXT = 'text',
  URL = 'url',
}
