import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityChannelsService } from '../../services/community-channels.service';
import { NbDialogService } from '@commudle/theme';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { ConsentTypesEnum } from 'apps/shared-models/enums/consent-types.enum';
import { Subscription } from 'rxjs';
import { EDiscussionType } from '@commudle/shared-models';
import { LibErrorHandlerService } from 'apps/lib-error-handler/src/public-api';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';

@Component({
  selector: 'app-join-by-token',
  templateUrl: './join-by-token.component.html',
  styleUrls: ['./join-by-token.component.scss'],
})
export class JoinByTokenComponent implements OnInit {
  @Input() selectedCommunity;
  joined = false;
  communityName;
  channelId;
  channelName: string;
  subscriptions: Subscription[] = [];
  discussionType: string;
  currentUser: ICurrentUser;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityChannelsService: CommunityChannelsService,
    private router: Router,
    private nbDialogService: NbDialogService,
    private libToasLogService: LibToastLogService,
    private errorHandler: LibErrorHandlerService,
    private authWatchService: LibAuthwatchService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.communityChannelsService.showByToken(this.activatedRoute.snapshot.params.token).subscribe((data) => {
        this.discussionType = data.display_type === EDiscussionType.CHANNEL ? 'channels' : 'forums';
        this.communityName = data.kommunity.name;
        this.channelId = data.id;
        this.channelName = data.name;
      }),
    ),
      this.authWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
        if (this.currentUser) {
          this.onAcceptRoleButton();
        } else {
          this.errorHandler.handleError(401, 'Login to apply');
        }
      });
  }

  verifyToken(decline?: boolean) {
    this.subscriptions.push(
      this.communityChannelsService.joinByToken(this.activatedRoute.snapshot.params.token, decline).subscribe(
        (data) => {
          this.libToasLogService.successDialog('Taking you to the channel!', 2500);
          if (decline) {
            this.router.navigate(['/communities', this.selectedCommunity.slug, this.discussionType, this.channelId], {
              queryParams: { decline: true },
            });
          } else {
            this.joined = true;
            this.router.navigate(['/communities', this.selectedCommunity.slug, this.discussionType, data]);
          }
        },
        (error) => {
          this.router.navigate(['/communities', this.selectedCommunity.slug, this.discussionType, this.channelId]);
        },
      ),
    );
  }

  onAcceptRoleButton() {
    const dialogRef = this.nbDialogService.open(UserConsentsComponent, {
      context: {
        consentType: ConsentTypesEnum.JoinChannelToken,
        communityNameToken: this.communityName,
        channelNameToken: this.channelName,
      },
    });
    dialogRef.componentRef.instance.consentOutput.subscribe((result) => {
      dialogRef.close();
      if (result === 'rejected') {
        this.verifyToken(true);
      } else {
        this.verifyToken();
      }
    });
  }
}
