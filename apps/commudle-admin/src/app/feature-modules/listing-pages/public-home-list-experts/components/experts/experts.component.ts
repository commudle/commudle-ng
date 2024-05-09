import { Component, OnInit } from '@angular/core';
import { IBadge, IPagination, IUser } from '@commudle/shared-models';
import { ExpertsService } from 'apps/commudle-admin/src/app/services/experts.service';

interface badgesList {
  badge: IBadge;
  users: IPagination<IUser>;
}
@Component({
  selector: 'commudle-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss'],
})
export class ExpertsComponent implements OnInit {
  expertBadges;
  badgesList: badgesList[] = [];

  constructor(private expertsService: ExpertsService) {}

  ngOnInit(): void {
    this.getBadges();
  }

  getBadges() {
    this.expertsService.getExpertBadges('expert').subscribe((data) => {
      this.expertBadges = data;
    });
  }
}
