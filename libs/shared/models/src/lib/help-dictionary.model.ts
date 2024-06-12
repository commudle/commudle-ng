export interface IHelpDictionary {
  type: EHelpDictionaryType;
  text: string;
  url: string;
}

export enum EHelpDictionaryType {
  TEXT = 'text',
  URL = 'url',
}
