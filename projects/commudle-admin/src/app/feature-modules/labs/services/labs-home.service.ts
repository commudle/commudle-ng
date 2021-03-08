import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable, concat } from 'rxjs';
import {LabsService} from 'projects/commudle-admin/src/app/feature-modules/labs/services/labs.service';
import {ITag} from 'projects/shared-models/tag.model';
import {ILab} from 'projects/shared-models/lab.model';

@Injectable({
  providedIn: 'root'
})
export class LabsHomeService {

  // behaviour subject for list of searched tag names --> subscribed to by search bar (initialize by empty array of ITag)
  private tagSearch: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);
  public tagSearch$: Observable<ITag[]> = this.tagSearch.asObservable();

  // behaviour subject for list of searched labs --> subscribed to by labs component (initialize by empty array of ILab)
  private labSearch: BehaviorSubject<ILab[]> = new BehaviorSubject<ILab[]>([]);
  public labSearch$: Observable<ILab[]> = this.labSearch.asObservable();

  constructor(
    private labsService: LabsService
  ) {
  }

  getTagSearchResults(value: string[], page?: number, count?: number) {
    console.log('called');
    this.labsService.searchTags(value, page, count).subscribe(data => this.tagSearch.next(data.tags));
  }

  getLabSearchResults(value: string[], page?: number, count?: number) {
    this.labSearch.next([]);
    this.getLabsByTags(
      value,
      (page || 1),
      (count || 10)
    )
  }

  getLabsByTags(value: string[], page, count) {
    this.labsService.searchLabsByTags(value, page, count).subscribe(
      data => {
        if (data.labs.length > 0) {
          this.labSearch.next(this.labSearch.getValue().concat(data.labs));
          this.getLabsByTags(value, page+1, count);
        }
      }
    )
  }
}
