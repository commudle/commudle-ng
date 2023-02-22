import { Chart } from 'chart.js';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'apps/shared-models/community.model';
import { StatsCommunitiesService } from 'apps/commudle-admin/src/app/services/stats/stats-communities.service';
import { Subscription } from 'rxjs';
import { IEventAttendees } from 'apps/shared-models/event-attendees';
@Component({
  selector: 'app-community-stats',
  templateUrl: './community-stats.component.html',
  styleUrls: ['./community-stats.component.scss'],
})
export class CommunityStatsComponent implements OnInit, OnDestroy {
  emails;
  community: ICommunity;
  subscriptions: Subscription[] = [];
  totalEvents;
  totalContentCreators;
  eventAttendees: IEventAttendees;
  tagsDistribution;

  constructor(private statsCommunitiesService: StatsCommunitiesService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.community = data.community;
      this.getMembersDistribution();
      this.getMembersTimeLine();
      this.getEventsTimeline();
      this.getSpeakersDistribution();
      this.getMembersContentCreators();
      this.getEventAttendanceStats();
      this.getPopularProfileSkillTags();
      // this.getMembersWorkExperienceDistribution();
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getMembersDistribution() {
    this.statsCommunitiesService.membersDistribution(this.community.slug).subscribe((data) => {
      const chartData = data.chart_data;
      return new Chart('chart-member-distibution', {
        type: 'pie',
        data: {
          datasets: [
            {
              data: [chartData.male, chartData.female, chartData.prefer_not_to_answer + chartData.NA],
              backgroundColor: ['blue', '#ff43bc', 'purple'],
            },
          ],

          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: ['Male', 'Female', 'NA'],
        },
        options: {
          responsive: true,
        },
      });
    });
  }

  getMembersTimeLine() {
    this.statsCommunitiesService.membersTimeline(this.community.slug).subscribe((data) => {
      return new Chart('chart-member-growth', {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'Member Count',
              data: data.chart_data,
              backgroundColor: '#5072ff',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                type: 'time',
                distribution: 'linear',
                time: {
                  unit: 'month',
                },
                scaleLabel: {
                  // display: true,
                  // labelString: 'Time'
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Number of Members',
                },
                ticks: {
                  suggestedMin: 0,
                },
              },
            ],
          },
        },
      });
    });
  }

  getEventsTimeline() {
    this.statsCommunitiesService.eventsTimeLine(this.community.id).subscribe((data) => {
      this.totalEvents = data.total;
      const chartData = data.chart_data;
      return new Chart('chart-community-events-timeline', {
        type: 'bar',
        data: {
          datasets: [
            {
              label: 'Events By Quarter',
              data: data.chart_data,
              backgroundColor: '#5072ff',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                type: 'time',
                distribution: 'linear',
                time: {
                  unit: 'month',
                  unitStepSize: 1,
                },
                scaleLabel: {
                  // display: true,
                  // labelString: 'Time'
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Number of Events',
                },
                ticks: {
                  suggestedMin: 0,
                  stepSize: 1,
                },
              },
            ],
          },
        },
      });
    });
  }

  getSpeakersDistribution() {
    this.statsCommunitiesService.speakersDistribution(this.community.id).subscribe((data) => {
      const chartData = data.chart_data;
      return new Chart('speaker-distribution', {
        type: 'pie',
        data: {
          datasets: [
            {
              data: [chartData.male, chartData.female, chartData.prefer_not_to_answer + chartData.na],
              backgroundColor: ['yellow', '#ff43', 'red'],
            },
          ],

          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: ['Male', 'Female', 'NA'],
        },
        options: {
          responsive: true,
        },
      });
    });
  }

  getMembersContentCreators() {
    this.subscriptions.push(
      this.statsCommunitiesService.membersContentCreators(this.community.slug).subscribe((data) => {
        this.totalContentCreators = data.chart_data;
      }),
    );
  }

  getEventAttendanceStats() {
    this.subscriptions.push(
      this.statsCommunitiesService.eventAttendanceStats(this.community.slug).subscribe((data) => {
        this.eventAttendees = data.chart_data.event_attendees;
      }),
    );
  }

  getPopularProfileSkillTags() {
    this.subscriptions.push(
      this.statsCommunitiesService.popularProfileSkillTags(this.community.slug).subscribe((data) => {
        this.tagsDistribution = data.chart_data.tags_distribution;
      }),
    );
  }

  getMembersWorkExperienceDistribution() {
    this.subscriptions.push(
      this.statsCommunitiesService.membersWorkExperienceDistribution(this.community.slug).subscribe((data) => {
        // console.log(data);
      }),
    );
  }
}
