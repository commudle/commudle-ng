import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'commudle-public-hackathon-teammate-form',
  templateUrl: './public-hackathon-teammate-form.component.html',
  styleUrls: ['./public-hackathon-teammate-form.component.scss'],
})
export class PublicHackathonTeammateFormComponent implements OnInit {
  @Input() teammateForm: FormGroup;

  @Output() createTeammateEvent = new EventEmitter();
  @Output() removeTeammateEvent = new EventEmitter<number>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addTeammate();
  }

  addTeammate() {
    this.createTeammateEvent.emit();
  }

  removeTeammate(index: number) {
    this.removeTeammateEvent.emit(index);
  }

  get teammatesArray() {
    return this.teammateForm.get('teammates') as FormArray;
  }
}
