import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  TemplateRef,
} from '@angular/core';
import { NbButtonAppearance, NbComponentStatus, NbDialogService } from '@commudle/theme';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { ConsentTypesEnum } from 'apps/shared-models/enums/consent-types.enum';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-follow',
  templateUrl: './user-follow.component.html',
  styleUrls: ['./user-follow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFollowComponent implements OnChanges, OnDestroy {
  @Input() username: string;
  @Input() name: string;
  @Input() userId: number;
  @Input() showIcon = true;
  @Input() appearance: NbButtonAppearance;
  @Input() status: NbComponentStatus;
  @Input() isMobileWidthFull = false;
  @Input() disabled = false;
  @Output() userFollowed: EventEmitter<any> = new EventEmitter<any>();
  currentUser: ICurrentUser;
  isFollowing = false;
  Following = false;

  subscriptions: Subscription[] = [];

  constructor(
    private appUsersService: AppUsersService,
    private authWatchService: LibAuthwatchService,
    private nbDialogService: NbDialogService,
    private gtm: GoogleTagManagerService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnChanges(): void {
    // Get logged in user
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
        this.checkFollowing();
        this.changeDetectorRef.markForCheck();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  checkFollowing() {
    if (this.currentUser) {
      this.subscriptions.push(
        this.appUsersService.check_followee(this.username).subscribe((value) => {
          this.isFollowing = value;
          this.changeDetectorRef.markForCheck();
        }),
      );
    }
  }

  toggleFollow() {
    this.subscriptions.push(
      this.appUsersService.toggleFollow(this.username).subscribe(() => {
        this.checkFollowing();
        this.userFollowed.emit();
        this.gtm.dataLayerPushEvent('user-follow-confirm', { com_followee_id: this.userId });
        this.changeDetectorRef.markForCheck();
      }),
    );
  }

  onFollowClick() {
    const dialogRef = this.nbDialogService.open(UserConsentsComponent, {
      context: {
        consentType: ConsentTypesEnum.UserFollow,
        username: this.name,
      },
    });

    dialogRef.componentRef.instance.consentOutput.subscribe((result) => {
      dialogRef.close();
      if (result === 'accepted') {
        this.isFollowing = true;
        this.toggleFollow();
      }
    });
    this.gtm.dataLayerPushEvent('user-follow-initiate', { com_followee_id: this.userId });
  }
}
