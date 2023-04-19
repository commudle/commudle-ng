import { Component, Input } from '@angular/core';
import { MentionResult } from '../../models/mentions.model';
import { AngularNodeViewComponent } from '../node-view.component';

@Component({
  selector: 'commudle-mentions-list',
  templateUrl: './mentions-list.component.html',
  styleUrls: ['./mentions-list.component.scss'],
})
export class MentionsListComponent extends AngularNodeViewComponent {
  @Input() props!: Record<string, any>;

  selectedIndex = 0;

  upHandler() {
    this.selectedIndex = (this.selectedIndex + this.props['items'].length - 1) % this.props['items'].length;
  }

  downHandler() {
    this.selectedIndex = (this.selectedIndex + 1) % this.props['items'].length;
  }

  enterHandler() {
    this.selectItem(this.selectedIndex);
  }

  selectItem(index: number) {
    const item: MentionResult = this.props['items'][index];

    if (item) {
      switch (item.model) {
        case 'community':
          this.props['command']({
            id: item.id,
            label: item.name,
            model: item.model,
            slug1: 'slug' in item ? item.slug : '',
          });
          break;
        case 'user':
          this.props['command']({
            id: item.id,
            label: item.name,
            model: item.model,
            slug1: 'username' in item ? item.username : '',
          });
          break;
      }
    }
  }

  onKeyDown({ event }: any) {
    switch (event.key) {
      case 'ArrowUp':
        this.upHandler();
        return true;
      case 'ArrowDown':
        this.downHandler();
        return true;
      case 'Enter':
        this.enterHandler();
        return true;
      default:
        return false;
    }
  }

  getPicture(item: MentionResult) {
    switch (item.model) {
      case 'community':
        return 'logo_image' in item ? item.logo_image?.i64 : '';
      case 'user':
        return 'photo' in item ? item.photo?.i32 : '';
    }
  }
}
