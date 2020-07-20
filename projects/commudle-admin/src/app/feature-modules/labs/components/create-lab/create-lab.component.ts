import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { LabsService } from '../../services/labs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-lab',
  templateUrl: './create-lab.component.html',
  styleUrls: ['./create-lab.component.scss']
})
export class CreateLabComponent implements OnInit {
  faFlask = faFlask;


  labForm = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private labsService: LabsService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  createLab() {
    this.labsService.createLab(this.labForm.get('name').value).subscribe(
      (data) => {
        console.log(data.slug);
        this.router.navigate(['/labs', data.slug, 'edit']);
      }
    );
  }

}
