import { Injectable } from '@angular/core';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class GooglePlacesAutocompleteService {
  autocomplete!: google.maps.places.Autocomplete;

  constructor() {}

  initAutocomplete(inputElement: HTMLInputElement, types: string = '(cities)') {
    this.autocomplete = new google.maps.places.Autocomplete(inputElement, {
      types: [types],
      componentRestrictions: { country: 'IN' },
    });
  }
}
