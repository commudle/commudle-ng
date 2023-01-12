import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { SeoService } from 'apps/shared-services/seo.service';
import { LabsService } from '../../services/labs.service';

@Component({
  selector: 'app-create-lab',
  templateUrl: './create-lab.component.html',
  styleUrls: ['./create-lab.component.scss'],
})
export class CreateLabComponent implements OnInit {
  faFlask = faFlask;

  labForm;

  constructor(
    private fb: FormBuilder,
    private labsService: LabsService,
    private router: Router,
    private seoService: SeoService,
  ) {
    this.labForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.setMeta();
  }

  createLab() {
    this.labsService.createLab(this.labForm.get('name').value).subscribe((data) => {
      this.router.navigate(['/labs', data.slug, 'edit']);
    });
  }

  setMeta(): void {
    this.seoService.setTags(
      'Publish Your Lab',
      'Labs are guided hands-on tutorials published by software developers. They teach you algorithms, help you create  apps & projects and cover topics including Web, Flutter, Android, iOS, Data Structures, ML & AI.',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
