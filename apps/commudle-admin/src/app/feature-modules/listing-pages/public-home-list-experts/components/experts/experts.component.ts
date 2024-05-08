import { Component, OnInit } from '@angular/core';
import { ExpertsService } from 'apps/commudle-admin/src/app/services/experts.service';

@Component({
  selector: 'commudle-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss'],
})
export class ExpertsComponent implements OnInit {
  expertBadges;
  constructor(private expertsService: ExpertsService) {}

  ngOnInit(): void {
    this.getBadges();
  }

  getBadges() {
    this.expertsService.getExpertBadges('expert').subscribe((data) => {
      this.expertBadges = data;
      console.log(data, 'data');
    });
  }
}
