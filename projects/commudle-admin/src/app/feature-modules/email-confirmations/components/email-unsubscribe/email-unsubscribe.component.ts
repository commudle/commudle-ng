import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IEmailUnsubscribeGroup } from 'projects/shared-models/email-unsubscribe-group.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { EmailUnsubscribeGroupsService } from '../../services/email-unsubscribe-groups.service';

@Component({
  selector: 'app-email-unsubscribe',
  templateUrl: './email-unsubscribe.component.html',
  styleUrls: ['./email-unsubscribe.component.scss']
})
export class EmailUnsubscribeComponent implements OnInit, OnDestroy {

  uuid;
  loading = false;
  emailUnsubscribeGroup: IEmailUnsubscribeGroup;
  currentUser: ICurrentUser;
  subscriptions = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private emailUnsubscribeGroupsService: EmailUnsubscribeGroupsService,
    private title: Title,
    private meta: Meta,
    private toastLogService: LibToastLogService,
    private authwatchService: LibAuthwatchService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.subscriptions.push(
      this.activatedRoute.params.subscribe(data => {
        if (data.eug) {
          this.uuid = data.eug;
          this.getSubscription();
        }
      })
    );

    this.subscriptions.push(
      this.authwatchService.currentUser$.subscribe(
        data => this.currentUser = data
      )
    );
  }

  ngOnDestroy() {
    this.meta.removeTag("name='robots'");

    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }


  getSubscription() {
    this.emailUnsubscribeGroupsService.getSubscription(this.uuid).subscribe(
      data => {
        this.emailUnsubscribeGroup = data;
        this.loading = false;
      }
    )
  }

  toggleSubscription() {
    this.loading = true;
    this.emailUnsubscribeGroupsService.toggleSubscription(this.uuid).subscribe(
      data => {
        this.emailUnsubscribeGroup.subscribed = data;
        this.loading = false;
        this.toastLogService.successDialog('Updated');
      }
    )
  }


  setMeta() {
    this.title.setTitle('Email Preferences');
    this.meta.updateTag({
      name: 'robots',
      content: 'noindex'
    });
  }

}
