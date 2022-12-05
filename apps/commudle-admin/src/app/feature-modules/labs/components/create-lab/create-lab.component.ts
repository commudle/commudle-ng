import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { LabsService } from '../../services/labs.service';

@Component({
  selector: 'app-create-lab',
  templateUrl: './create-lab.component.html',
  styleUrls: ['./create-lab.component.scss'],
})
export class CreateLabComponent implements OnInit {
  faFlask = faFlask;

  labForm;

  constructor(private fb: FormBuilder, private labsService: LabsService, private router: Router) {
    this.labForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {}

  createLab() {
    this.labsService.createLab(this.labForm.get('name').value).subscribe((data) => {
      this.router.navigate(['/labs', data.slug, 'edit']);
    });
  }
}
