import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LabsService} from 'projects/commudle-admin/src/app/feature-modules/labs/services/labs.service';
import {ITag} from 'projects/shared-models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class LabsHomeService {

  // behaviour subject for list of searched tag names --> subscribed to by search bar (initialize by empty array of ITag)
  private tagSearch: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);
  public tagSearch$: Observable<ITag[]> = this.tagSearch.asObservable();

  // behaviour subject for list of searched labs --> subscribed to by labs component (initialize by empty array of ILab)

  constructor(
    private labsService: LabsService
  ) {
  }

  addSearchTag(tagName) {
    // update the list of searched labs through this
  }

  getTagSearchResults(value: string[]) {
    this.labsService.searchTags(value).subscribe(data => this.tagSearch.next(data.tags))
  }
}
