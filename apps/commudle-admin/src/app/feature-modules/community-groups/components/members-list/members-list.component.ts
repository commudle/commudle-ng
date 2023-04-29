import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { IUser } from 'apps/shared-models/user.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'commudle-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss'],
})
export class MembersListComponent implements OnInit, OnDestroy {
  members: IUser[] = [];
  subscriptions: Subscription[] = [];
  communityGroup: ICommunityGroup;

  searchForm;
  options;
  query = '';
  isLoading = false;
  speaker = false;
  employer = false;
  contentCreator = false;
  employee = false;
  page = 1;
  count = 10;
  total = 0;

  constructor(
    private fb: FormBuilder,
    private communityGroupsService: CommunityGroupsService,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
  ) {
    this.searchForm = this.fb.group({
      name: [''],
    });
    this.options = ['speakers', 'content creator', 'employer', 'employee'];
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.communityGroup = data.community_group;
        this.getMembers();
        this.setMeta();
        this.search();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getMembers() {
    this.isLoading = true;
    this.subscriptions.push(
      this.communityGroupsService
        .members(
          this.query,
          this.communityGroup.slug,
          this.count,
          this.page,
          this.employer,
          this.employee,
          this.contentCreator,
          this.speaker,
        )
        .subscribe((data) => {
          this.isLoading = false;
          this.members = data.users;
          this.page = +data.page;
          this.total = data.total;
        }),
    );
  }

  search() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(800),
        switchMap(() => {
          this.page = 1;
          this.isLoading = true;
          this.query = this.searchForm.get('name').value;
          return this.communityGroupsService.members(
            this.query,
            this.communityGroup.slug,
            this.count,
            this.page,
            this.employer,
            this.employee,
            this.contentCreator,
            this.speaker,
          );
        }),
      )
      .subscribe((data) => {
        this.isLoading = false;
        this.members = data.users;
        this.page = +data.page;
        this.total = data.total;
      });
  }

  filterByTags(event) {
    if (event === this.options[0]) {
      this.speaker = !this.speaker;
    }
    if (event === this.options[1]) {
      this.contentCreator = !this.contentCreator;
    }
    if (event === this.options[2]) {
      this.employer = !this.employer;
    }
    if (event === this.options[3]) {
      this.employee = !this.employee;
    }

    this.page = 1;
    this.getMembers();
  }

  setMeta() {
    this.seoService.setTags(
      `Members - Admin - ${this.communityGroup.name}`,
      this.communityGroup.mini_description,
      this.communityGroup.logo.i350,
    );
  }
}
