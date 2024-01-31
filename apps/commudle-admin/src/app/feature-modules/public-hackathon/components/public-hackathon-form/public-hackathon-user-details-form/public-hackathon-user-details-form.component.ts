import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'commudle-public-hackathon-user-details-form',
  templateUrl: './public-hackathon-user-details-form.component.html',
  styleUrls: ['./public-hackathon-user-details-form.component.scss'],
})
export class PublicHackathonUserDetailsFormComponent {
  @Input() userForm: FormGroup;

  constructor() {}
}
