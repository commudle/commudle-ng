import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NewsletterService } from 'apps/commudle-admin/src/app/services/newsletter.service';
import { INewsletter } from 'apps/shared-models/newsletter.model';
import { Subscription, combineLatest } from 'rxjs';
import { Location } from '@angular/common';
import { ToastrService } from '@commudle/shared-services';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-newsletter-form',
  templateUrl: './newsletter-form.component.html',
  styleUrls: ['./newsletter-form.component.scss'],
})
export class NewsletterFormComponent implements OnInit {
  newsletterForm: FormGroup;
  parentId: string;
  parentType: string;
  pageSlug: string;
  subscriptions: Subscription[] = [];

  icons = {
    faChevronLeft,
  };

  constructor(
    private newsletterService: NewsletterService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastrService: ToastrService,
  ) {
    this.newsletterForm = this.fb.group({
      title: ['', Validators.required],
      email_subject: ['', Validators.required],
      published: [true],
      content: ['', Validators.required],
      banner_image: [File, Validators.required],
    });
  }

  ngOnInit() {
    combineLatest([this.activatedRoute.parent.parent.paramMap, this.activatedRoute.params]).subscribe(
      ([params, data]) => {
        this.pageSlug = data.newsletter_slug;
        if (params.get('community_id')) {
          this.parentId = params.get('community_id');
          this.parentType = 'Kommunity';
        }
        if (params.get('community_group_id')) {
          this.parentId = params.get('community_group_id');
          this.parentType = 'CommunityGroup';
        }

        if (this.pageSlug) {
          this.fetchCustomPageDetails();
        }
      },
    );
  }

  fetchCustomPageDetails() {
    this.subscriptions.push(
      this.newsletterService.getShow(this.pageSlug).subscribe((data: INewsletter) => {
        if (data) {
          this.newsletterForm.patchValue({
            title: data.title,
            email_subject: data.email_subject,
            published: data.published,
            content: data.content,
          });
        }
      }),
    );
  }

  createOrUpdate() {
    if (this.pageSlug) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    this.newsletterService
      .createNewNewsletter(this.newsletterForm.value, this.parentId, this.parentType)
      .subscribe((data) => {
        if (data) {
          this.toastrService.successDialog('Page Created');
          this.backPage();
        }
      });
  }

  update() {
    this.newsletterService.update(this.newsletterForm.value, this.pageSlug).subscribe((data) => {
      if (data) {
        this.toastrService.successDialog('Page Updated');
        this.backPage();
      }
    });
  }

  backPage() {
    this.location.back();
  }
}
