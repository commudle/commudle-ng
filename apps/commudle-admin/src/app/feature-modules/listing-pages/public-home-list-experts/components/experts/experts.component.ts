import { Component, OnInit } from '@angular/core';
import { ExpertsService } from 'apps/commudle-admin/src/app/services/experts.service';

@Component({
  selector: 'commudle-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss'],
})
export class ExpertsComponent implements OnInit {
  constructor(private expertsService: ExpertsService) {}

  ngOnInit(): void {}
}
