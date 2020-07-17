import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-lab',
  templateUrl: './create-lab.component.html',
  styleUrls: ['./create-lab.component.scss']
})
export class CreateLabComponent implements OnInit {


  labForm = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }


  createLab() {

  }

}
