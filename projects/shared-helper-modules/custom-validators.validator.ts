import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";


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


// export function MultipleEmailsValidator(control: FormControl) {
//   if ( /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/.test(control.value)) {
//     return { multipleEmails: true };
//   }
//   return null;
// }


export function MatchStringValidator(text: string) {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (control.value == text) {
      return null;
    } else {
      return { matchString: false };
    }

  };
}

