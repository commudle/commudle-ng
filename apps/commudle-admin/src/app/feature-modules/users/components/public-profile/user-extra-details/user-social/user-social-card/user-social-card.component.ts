import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ICurrentUser } from '@commudle/shared-models';
import { ISocialResource } from '@commudle/shared-models';
import { IUser } from '@commudle/shared-models';

@Component({
  selector: 'commudle-user-social-card',
  templateUrl: './user-social-card.component.html',
  styleUrls: ['./user-social-card.component.scss'],
})
export class UserSocialCardComponent implements OnInit {
  @Input() socialResource: ISocialResource;
  @Input() user: IUser;
  @Input() currentUser: ICurrentUser;

  @Output() deleteResource: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('confirmationDialog') confirmationDialog: TemplateRef<any>;

  constructor(private nbDialogService: NbDialogService) {}

  ngOnInit(): void {}

  onDialogOpen() {
    this.nbDialogService.open(this.confirmationDialog);
  }

  onDeleteResource(ref: NbDialogRef<any>) {
    this.deleteResource.emit(this.socialResource.id);
    ref.close();
  }
}
