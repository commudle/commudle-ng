import { Component, OnInit } from '@angular/core';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-lab',
  templateUrl: './edit-lab.component.html',
  styleUrls: ['./edit-lab.component.scss']
})
export class EditLabComponent implements OnInit {
  faFlask = faFlask;


  labForm = this.fb.group({
    name: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

}
