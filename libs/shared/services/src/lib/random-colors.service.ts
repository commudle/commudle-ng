import { Injectable } from '@angular/core';
import { NbToastrService, NbIconConfig } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class RandomColorsService {


  constructor(
    private toastrService: NbToastrService,
  ) { }

  generateArray(length) {
    let colorArray = [];
    let i = 0;
    while (i < length) {
      colorArray.push('#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6));
      i++;
    }
    return colorArray;
  }
}
