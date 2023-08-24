import { EventEmitter, Injectable } from '@angular/core';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class GooglePlacesAutocompleteService {
  autocomplete!: google.maps.places.Autocomplete;
  placeChanged: EventEmitter<google.maps.places.PlaceResult> = new EventEmitter<google.maps.places.PlaceResult>();

  constructor() {}

  initAutocomplete(inputElement: HTMLInputElement, types: string = '(cities)') {
    this.autocomplete = new google.maps.places.Autocomplete(inputElement, {
      types: [types],
    });

    this.autocomplete.addListener('place_changed', () => {
      const selectedPlace: google.maps.places.PlaceResult = this.autocomplete.getPlace();
      this.placeChanged.emit(selectedPlace);
    });
  }
}
