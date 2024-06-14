import { EHelpDictionaryType } from '@commudle/shared-models';
const helpDictionary = {
  'help-event-details': {
    type: EHelpDictionaryType.TEXT,
    text: 'Hello',
  },
  'help-event-edit-details': {
    type: EHelpDictionaryType.URL,
    url: 'https://www.commudle.com/',
  },
  'help-event': {
    type: EHelpDictionaryType.URL,
    url: 'https://www.commudle.com/policies/all-policies',
  },
};

export const help_dictionary = helpDictionary;
