import { Subscription } from 'rxjs';
import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { IEventUpdate } from 'apps/shared-models/event_update.model';
import * as moment from 'moment';
import { EDbModels, IPageInfo } from '@commudle/shared-models';
import { NbDialogService } from '@commudle/theme';
import { EntityUpdatesService } from 'apps/commudle-admin/src/app/services/entity-updates.service';

@Component({
  selector: 'commudle-entity-updates',
  templateUrl: './entity-updates.component.html',
  styleUrls: ['./entity-updates.component.scss'],
})
export class EntityUpdatesComponent implements OnInit {
  @Input() entityId: number;
  @Input() entityType: EDbModels;
  updates: IEventUpdate[] = [];
  moment = moment;
  page_info: IPageInfo;
  limit = 5;
  subscriptions: Subscription[] = [];

  @ViewChild('imageTemplate') imageTemplate: TemplateRef<any>;

  constructor(private dialogService: NbDialogService, private entityUpdatesService: EntityUpdatesService) {}

  ngOnInit() {
    this.getUpdates();
  }

  getUpdates() {
    this.subscriptions.push(
      this.entityUpdatesService.pGetEntityUpdates(this.entityId, this.entityType).subscribe((data) => {
        this.updates = this.updates.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.page_info = data.page_info;
      }),
    );
  }

  openImage(image, eu) {
    this.dialogService.open(this.imageTemplate, {
      context: {
        image: image,
        eventUpdate: eu,
      },
    });
  }
}
