import { Component, OnDestroy, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NotificationsStore } from 'apps/commudle-admin/src/app/feature-modules/notifications/store/notifications.store';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { DOCUMENT } from '@angular/common';
import { NbDialogService } from '@commudle/theme';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { ENotificationSenderTypes } from 'apps/shared-models/enums/notification_sender_types.enum';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-community',
  templateUrl: './home-community.component.html',
  styleUrls: ['./home-community.component.scss'],
})
export class HomeCommunityComponent implements OnInit, OnDestroy {
  community: ICommunity;
  isOrganizer = false;
  showMiniHeader = false;

  notificationCount = 0;
  environment = environment;
  ENotificationSenderTypes = ENotificationSenderTypes;
  uploadedBannerFile: File;
  uploadedBanner: any;
  faMessage = faMessage;

  subscriptions: Subscription[] = [];

  @ViewChild('updateBannerDialogBox') updateBannerDialogBox: TemplateRef<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private communitiesService: CommunitiesService,
    private notificationsStore: NotificationsStore,
    private toastLogService: LibToastLogService,
    @Inject(DOCUMENT) private document: Document,
    private dialogService: NbDialogService,
    private gtm: GoogleTagManagerService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateHeaderVariation();
      }
    });
    this.activatedRoute.data.subscribe((data) => {
      this.community = data.community;
      this.updateHeaderVariation();

      this.uploadedBanner = this.community.banner_image ? this.community.banner_image.url : '';
      if (this.community.is_visible) {
        this.seoService.setTags(this.community.name, this.community.mini_description, this.community.logo_path);
      } else {
        this.seoService.noIndex(true);
      }
    });
    this.subscriptions.push(
      this.communitiesService.userManagedCommunities$.subscribe((data: ICommunity[]) => {
        if (data.find((cSlug) => cSlug.slug === this.community.slug) !== undefined) {
          this.isOrganizer = true;
          this.getNotificationsCount(this.community.id);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.seoService.noIndex(false);
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getNotificationsCount(id) {
    if (this.notificationsStore.communityNotificationsCount$[id] !== undefined) {
      this.subscriptions.push(
        this.notificationsStore.communityNotificationsCount$[id].subscribe((data: number) => {
          this.notificationCount = data;
        }),
      );
    }
  }

  openUpdateBannerDialogBox() {
    this.dialogService.open(this.updateBannerDialogBox, {
      closeOnEsc: true,
      closeOnBackdropClick: false,
    });
  }

  displaySelectedBanner(event: any) {
    if (event.target.files && event.target.files[0]) {
      const bannerFile = event.target.files[0];
      this.uploadedBannerFile = bannerFile;
      const reader = new FileReader();
      reader.onload = (e: any) => (this.uploadedBanner = reader.result);
      reader.readAsDataURL(bannerFile);
    }
  }

  updateBanner() {
    const formData: any = new FormData();
    formData.append('community[id]', this.community.id);
    formData.append('community[name]', this.community.name);
    formData.append('community[about]', this.community.about);
    formData.append('community[mini_description]', this.community.mini_description);
    formData.append('community[contact_email]', this.community.contact_email);
    formData.append('community[location]', this.community.location);
    formData.append('community[banner_image]', this.uploadedBannerFile);

    this.communitiesService.updateCommunity(formData, this.community.id).subscribe(() => {
      this.toastLogService.successDialog('Updated! Reloading the app for changes to apply...');
      this.document.location.reload();
    });
  }

  gtmService() {
    this.gtm.dataLayerPushEvent('click-notification-bell-icon', {
      com_notification_type: this.ENotificationSenderTypes.KOMMUNITY,
    });
  }

  updateHeaderVariation() {
    const url = this.router.url;
    const value = url.split(this.community.slug)[1];
    if (value) {
      this.showMiniHeader = true;
    } else {
      this.showMiniHeader = false;
    }
  }
}
