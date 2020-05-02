import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { EventCollaborationCommunitiesService } from 'projects/commudle-admin/src/app/services/event-collaboration-communities.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';
import { IEventCollaborationCommunity } from 'projects/shared-models/event_collaboration_community.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-collaborating-communities',
  templateUrl: './collaborating-communities.component.html',
  styleUrls: ['./collaborating-communities.component.scss']
})
export class CollaboratingCommunitiesComponent implements OnInit, OnChanges {
  @Input() community: ICommunity;
  @Input() event: IEvent;

  @ViewChild('autoInput') input;

  communities: ICommunity[];
  apiCommunities$: Observable<ICommunity[]>;


  collaborationCommunities: IEventCollaborationCommunity[] = [];


  constructor(
    private eventCollaborationCommunitiesService: EventCollaborationCommunitiesService,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit() {
    this.communities = [];
    this.apiCommunities$ = of(this.communities);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.community && this.event) {
      this.getCollaborations();
    }
  }

  private filter(name: string): ICommunity[] {
    const filterValue = name.toLowerCase();
    return this.communities.filter(optionValue => optionValue.name.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: string): Observable<ICommunity[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  onChange() {
    this.apiCommunities$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event) {
    this.apiCommunities$ = this.getFilteredOptions($event);
  }


  getCollaborations() {
    this.eventCollaborationCommunitiesService.get(this.event.id).subscribe(
      (data) => this.collaborationCommunities = data.event_collaboration_communities
    );
  }

  createCollaboration() {
    this.eventCollaborationCommunitiesService.create(this.event.id, this.community.id).subscribe(
      (data) => {
        this.collaborationCommunities.push(data);
        this.toastLogService.successDialog('Collaboration request sent to the primary email of all organizers');
      }
    );
  }

  removeCollaboration(collaborationCommunityId, index) {
    this.eventCollaborationCommunitiesService.destroy(collaborationCommunityId).subscribe(
      data => {
        this.collaborationCommunities.splice(index, 1);
        this.toastLogService.successDialog('Collaboration removed!');
      }
    )
  }

  resendConfirmationEmail(collaborationCommunityId) {
    this.eventCollaborationCommunitiesService.resendInvitationMail(collaborationCommunityId).subscribe(
      data => {
        this.toastLogService.successDialog('Collaboration request email resent!');
      }
    )
  }

}
