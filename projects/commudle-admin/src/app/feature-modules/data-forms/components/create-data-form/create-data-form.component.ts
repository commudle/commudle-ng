import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-data-form',
  templateUrl: './create-data-form.component.html',
  styleUrls: ['./create-data-form.component.scss']
})
export class CreateDataFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('rendered');
  }

}
