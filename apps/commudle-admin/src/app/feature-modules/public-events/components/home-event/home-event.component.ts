import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { environment } from "@commudle/shared-environments";
import { EEventStatuses, ICommunity, IDiscussion, IEvent } from "@commudle/shared-models";
import { EventsService, SeoService } from "@commudle/shared-services";
import { CommunitiesService } from "apps/commudle-admin/src/app/services/communities.service";
import { DiscussionsService } from "apps/commudle-admin/src/app/services/discussions.service";
import * as moment from "moment";
import * as momentTimezone from "moment-timezone";

@Component({
  selector: "commudle-home-event",
  templateUrl: "./home-event.component.html",
  styleUrls: ["./home-event.component.scss"],
})
export class HomeEventComponent implements OnInit, OnDestroy {
  moment = moment;
  momentTimezone = momentTimezone;
  EEventStatuses = EEventStatuses;

  community: ICommunity;
  event: IEvent;
  discussionChat: IDiscussion;

  hasUpdates = false;
  hasAgenda = false;
  hasSpeakers = false;
  hasCollaborationCommunities = false;
  hasVolunteers = false;
  hasOpenForms = false;
  hasInterestedMembers = false;
  hasSponsors = false;

  environment = environment;

  managedCommunities: ICommunity[] = [];

  subscriptions = [];

  isOrganizer = false;

  @ViewChild("updatesSection", { static: false }) updatesSectionRef: ElementRef<HTMLDivElement>;
  @ViewChild("descriptionSection", { static: false }) descriptionSectionRef: ElementRef<HTMLDivElement>;
  @ViewChild("agendaSection", { static: false }) agendaSectionRef: ElementRef<HTMLDivElement>;
  @ViewChild("speakersSection", { static: false }) speakersSectionRef: ElementRef<HTMLDivElement>;
  @ViewChild("sponsorsSection", { static: false }) sponsorsSectionRef: ElementRef<HTMLDivElement>;
  @ViewChild("collaborationCommunitiesSection", { static: false })
  collaborationCommunitiesSectionRef: ElementRef<HTMLDivElement>;
  @ViewChild("commentsSection", { static: false }) commentsSectionRef: ElementRef<HTMLDivElement>;
  @ViewChild("volunteersSection", { static: false }) volunteersSectionRef: ElementRef<HTMLDivElement>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private communitiesService: CommunitiesService,
    private seoService: SeoService,
    private discussionsService: DiscussionsService,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.getEvent(params.event_id);
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  scroll(element: ElementRef<HTMLDivElement>) {
    element.nativeElement.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" });
  }

  getEvent(eventId) {
    this.eventsService.pGetEvent(eventId).subscribe((event) => {
      this.event = event;
      this.getCommunity(event.kommunity_id);
      this.getDiscussionChat();
    });
  }

  getCommunity(communityId) {
    this.communitiesService.getCommunityDetails(communityId).subscribe((community) => {
      this.community = community;
      this.isOrganizerCheck(this.community.slug);

      this.seoService.setTags(
        `${this.event.name} | ${this.community.name}`,
        this.event.description.replace(/<[^>]*>/g, "").substring(0, 200),
        this.event.header_image_path ? this.event.header_image_path : this.community.logo_path,
      );
    });
  }

  isOrganizerCheck(community) {
    this.subscriptions.push(
      this.communitiesService.userManagedCommunities$.subscribe((data: ICommunity[]) => {
        if (data.find((cSlug) => cSlug.slug === community) !== undefined) {
          this.isOrganizer = true;
        }
      }),
    );
  }

  getDiscussionChat() {
    this.discussionsService.pGetOrCreateForEventChat(this.event.id).subscribe((data) => (this.discussionChat = data));
  }
}
