import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '@commudle/shared-models';
import { ExpertsService } from 'apps/commudle-admin/src/app/services/experts.service';

@Component({
  selector: 'commudle-experts-users',
  templateUrl: './experts-users.component.html',
  styleUrls: ['./experts-users.component.scss'],
})
export class ExpertsUsersComponent implements OnInit {
  @Input() id;
  experts = [];
  constructor(private expertsService: ExpertsService) {}

  ngOnInit(): void {
    this.expertsService.getExpertUsers(this.id).subscribe((data) => {
      this.experts = this.experts.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
    });
  }
}
