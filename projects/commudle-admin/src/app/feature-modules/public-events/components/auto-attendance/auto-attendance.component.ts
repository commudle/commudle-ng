import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { EventEntryPassesService } from 'projects/commudle-admin/src/app/services/event-entry-passes.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-auto-attendance',
  templateUrl: './auto-attendance.component.html',
  styleUrls: ['./auto-attendance.component.scss']
})
export class AutoAttendanceComponent implements OnInit {
  @Input() eventId;
  constructor(
    private eventEntryPassesService: EventEntryPassesService,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit() {
    this.markAttendance();
  }

  markAttendance() {
    this.eventEntryPassesService.autoOnlineAttendance(this.eventId).subscribe(
      data => {
        if (data) {
          this.toastLogService.successDialog("Welcome to the event!");
        }
      }
    );
  }

}
