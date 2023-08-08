import { Component, OnInit, Input } from '@angular/core';
import { NbWindowService } from '@commudle/theme';
import { EditEventComponent } from 'apps/commudle-admin/src/app/feature-modules/events/components/edit-event/edit-event.component';
import { IEvent } from 'apps/shared-models/event.model';

@Component({
  selector: 'app-community-events-list-actions',
  templateUrl: './community-events-list-actions.component.html',
  styleUrls: ['./community-events-list-actions.component.scss'],
})
export class CommunityEventsListActionsComponent implements OnInit {
  @Input() value: string | number;
  @Input() rowData: IEvent;
  constructor(private windowService: NbWindowService) {}

  ngOnInit() {}

  openCloneEventWindow() {
    this.windowService.open(EditEventComponent, {
      title: `Copy of ${this.rowData.name}`,
      context: { eventId: this.rowData.id, type: 'clone' },
    });
  }
}
