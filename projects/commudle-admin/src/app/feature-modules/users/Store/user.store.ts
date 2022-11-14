import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'projects/shared-models/user.model';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private userData: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);
  public userData$ = this.userData.asObservable();

  constructor(private usersService: AppUsersService) {}

  getProfile(username) {
    this.usersService.getProfile(username).subscribe((data) => {
      this.userData.next(data);
    });
  }
}
