import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@commudle/theme';
@Component({
  selector: 'commudle-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss'],
})
export class CommunityPageComponent implements OnInit {
  constructor(private dialogService: NbDialogService) {}

  ngOnInit(): void {
    this.getCustomPages();
  }

  getCustomPages() {}

  openCreateNewPageDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }
  create() {}

  update() {}
}
