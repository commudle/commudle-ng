import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { ISocialResource } from 'projects/shared-models/social_resource.model';
import { IUser } from 'projects/shared-models/user.model';

@Component({
  selector: 'app-user-social-card',
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
