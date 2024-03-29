import { Chart } from 'chart.js';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'apps/shared-models/community.model';
import { StatsCommunitiesService } from 'apps/commudle-admin/src/app/services/stats/stats-communities.service';
import { Subscription } from 'rxjs';

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
  eventAttendees;
  tagsDistribution;
  membersWorkExperience;
  speakers;

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
      this.getMembersWorkExperienceDistribution();
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
              data: [chartData.male, chartData.female, chartData.prefer_not_to_answer, chartData.NA],
              backgroundColor: ['#3366ff', '#ff43bc', 'purple', 'green'],
            },
          ],

          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: ['Male', 'Female', 'Prefer Not Answer', 'NA'],
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
        type: 'bar',
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
                distribution: 'series',
                time: {
                  unit: 'month',
                  unitStepSize: 1,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Time',
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Number of Members',
                },
                // ticks: {
                //   suggestedMin: 0,
                // },
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
              data: chartData,
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
      this.speakers = data.chart_data;
      return new Chart('speaker-distribution', {
        type: 'pie',
        data: {
          datasets: [
            {
              data: [this.speakers.male, this.speakers.female, this.speakers.prefer_not_to_answer, this.speakers.NA],
              backgroundColor: ['blue', '#ff43bc', 'purple', 'green'],
            },
          ],

          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: ['Male', 'Female', 'Prefer Not Answer', 'NA'],
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
        this.eventAttendees = data.chart_data;
      }),
    );
  }

  getPopularProfileSkillTags() {
    this.subscriptions.push(
      this.statsCommunitiesService.popularProfileSkillTags(this.community.slug).subscribe((data) => {
        this.tagsDistribution = data.chart_data;
      }),
    );
  }

  getMembersWorkExperienceDistribution() {
    this.subscriptions.push(
      this.statsCommunitiesService.membersWorkExperienceDistribution(this.community.slug).subscribe((data) => {
        this.membersWorkExperience = data.chart_data;
        return new Chart('work-experience-distribution', {
          type: 'pie',
          data: {
            datasets: [
              {
                data: [
                  this.membersWorkExperience.work_experience_distribution.less_than_one,
                  this.membersWorkExperience.work_experience_distribution.one_to_two,
                  this.membersWorkExperience.work_experience_distribution.three_to_five,
                  this.membersWorkExperience.work_experience_distribution.greater_than_five,
                ],
                backgroundColor: ['#3366ff', '#ff43bc', 'purple', 'red'],
              },
            ],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: ['<One', 'One - Two', 'Three - Five', '<Five'],
          },
          options: {
            responsive: true,
          },
        });
      }),
    );
  }
}
