import { Chart } from 'chart.js';
import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'projects/shared-models/community.model';
import { StatsCommunitiesService } from 'projects/commudle-admin/src/app/services/stats/stats-communities.service';

@Component({
  selector: 'app-community-stats',
  templateUrl: './community-stats.component.html',
  styleUrls: ['./community-stats.component.scss']
})
export class CommunityStatsComponent implements OnInit, OnDestroy {
  emails;
  community: ICommunity;
  subscriptions = [];
  totalEvents;

  constructor(
    private statsCommunitiesService: StatsCommunitiesService,
    private communitiesService: CommunitiesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.community = data.community;
      this.getMembersDistribution();
      this.getMembersTimeLine();
      this.getEventsTimeline();
    });
  }

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  getMembersDistribution() {
    this.statsCommunitiesService.membersDistribution(this.community.slug).subscribe(
      data => {
        let chartData = data.chart_data;
        return new Chart('chart-member-distibution',  {
          type: 'pie',
          data: {
            datasets: [{
                data: [
                  chartData.male,
                  chartData.female,
                  chartData.prefer_not_to_answer + chartData.NA,
                ],
                backgroundColor: ['blue', '#ff43bc', 'purple']
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: ["Male", "Female", "NA"]
          },
          options: {
            responsive: true
          }
        });
      }
    );
  }

  getMembersTimeLine() {
    this.statsCommunitiesService.membersTimeline(this.community.slug).subscribe(
      data => {
        return new Chart('chart-member-growth',  {
          type: 'line',
          data: {
            datasets: [{
              label: "Member Count",
              data: data.chart_data,
              backgroundColor: '#5072ff'
            }],

          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              xAxes: [{
                type: 'time',
                distribution: 'linear',
                time: {
                  unit: 'month'
                },
                scaleLabel: {
                  // display: true,
                  // labelString: 'Time'
                }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Number of Members'
                },
                ticks: {
                  suggestedMin: 0
                }
              }]
            }
          }
        });
      }
    );
  }

  getEventsTimeline() {
    this.statsCommunitiesService.eventsTimeLine(this.community.id).subscribe(
      data => {
        this.totalEvents = data.total;
        let chartData = data.chart_data;
        return new Chart('chart-community-events-timeline',  {
          type: 'bar',
          data: {
            datasets: [{
              label: "Events By Quarter",
              data: data.chart_data,
              backgroundColor: '#5072ff'
            }],

          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              xAxes: [{
                type: 'time',
                distribution: 'linear',
                time: {
                  unit: 'month',
                  unitStepSize: 1
                },
                scaleLabel: {
                  // display: true,
                  // labelString: 'Time'
                },

              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Number of Events'
                },
                ticks: {
                  suggestedMin: 0,
                  stepSize: 1
                }
              }]
            }
          }
        });
      }
    );
  }

  getEmail() {

  }

}
