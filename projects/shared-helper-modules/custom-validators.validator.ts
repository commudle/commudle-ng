import { FormControl } from "@angular/forms";


export function NoWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}


export function WhiteSpaceNotAllowedValidator(control: FormControl) {
  if((control.value as string).indexOf(' ') >= 0){
    return {whiteSpaceNotAllowed: true}
  }

  return null;
}


export function NoSpecialCharactersValidator(control: FormControl) {
  if ( !/^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./]*$/.test(control.value)) {
    return { symbols: true };
  }
  return null;
}



