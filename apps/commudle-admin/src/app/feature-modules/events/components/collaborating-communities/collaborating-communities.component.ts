import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { EventCollaborationCommunitiesService } from 'apps/commudle-admin/src/app/services/event-collaboration-communities.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { IEventCollaborationCommunity } from 'apps/shared-models/event_collaboration_community.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-collaborating-communities',
  templateUrl: './collaborating-communities.component.html',
  styleUrls: ['./collaborating-communities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollaboratingCommunitiesComponent implements OnInit, OnChanges {
  @Input() community: ICommunity;
  @Input() event: IEvent;

  @ViewChild('autoInput') input;

  communities: ICommunity[];
  selectedCommunity = '';
  typing = false;

  collaborationCommunities: IEventCollaborationCommunity[] = [];

  faInfoCircle = faInfoCircle;

  constructor(
    private eventCollaborationCommunitiesService: EventCollaborationCommunitiesService,
    private toastLogService: LibToastLogService,
    private communitiesService: CommunitiesService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.communities = [];
  }

  onSelectionChange($event) {
    this.createCollaboration($event.id);
    this.selectedCommunity = '';
    this.input.nativeElement.value = '';
    this.communities = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.community && this.event) {
      this.getCollaborations();
    }
  }

  onChange() {
    return this.communitiesService.searchByName(this.input.nativeElement.value).subscribe((data) => {
      this.communities = data;
      this.changeDetectorRef.markForCheck();
    });
  }

  getCollaborations() {
    this.eventCollaborationCommunitiesService.get(this.event.id).subscribe((data) => {
      this.collaborationCommunities = data.event_collaboration_communities;
      this.changeDetectorRef.markForCheck();
    });
  }

  createCollaboration(selectedCommunityId) {
    this.eventCollaborationCommunitiesService.create(this.event.id, selectedCommunityId).subscribe((data) => {
      this.collaborationCommunities.push(data);
      this.toastLogService.successDialog('Collaboration request sent to the primary email of all organizers');
      this.changeDetectorRef.markForCheck();
    });
  }

  removeCollaboration(collaborationCommunityId, index) {
    this.eventCollaborationCommunitiesService.destroy(collaborationCommunityId).subscribe((data) => {
      this.collaborationCommunities.splice(index, 1);
      this.toastLogService.successDialog('Collaboration removed!');
      this.changeDetectorRef.markForCheck();
    });
  }

  resendConfirmationEmail(collaborationCommunityId) {
    this.eventCollaborationCommunitiesService.resendInvitationMail(collaborationCommunityId).subscribe((data) => {
      this.toastLogService.successDialog('Collaboration request email resent!');
      this.changeDetectorRef.markForCheck();
    });
  }

  checkTyping() {
    this.typing = this.input.nativeElement.value.length > 2;
  }
}
