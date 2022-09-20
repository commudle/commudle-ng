import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICurrentUser } from '@commudle/shared-models';
import { AppUsersService, LibAuthwatchService } from '@commudle/shared-services';
import {
  NoSpecialCharactersValidator,
  NoWhitespaceValidator,
  WhiteSpaceNotAllowedValidator,
} from '@commudle/shared-validators';
import { NbDialogService } from '@nebular/theme';
import { debounceTime, switchMap } from 'rxjs/operators';
import { UserProfileManagerService } from '../../../../../services/user-profile-manager.service';

@Component({
  selector: 'commudle-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss'],
})
export class UsernameComponent implements OnInit {
  @Input() showSaveButton = true;
  @Output() usernameValidation: EventEmitter<any> = new EventEmitter<any>();

  validUsername = false;
  lastUsername = '';
  currentUsername = '';
  checkingUsername = false;
  currentUser: ICurrentUser;
  reloadPage = true;

  usernameForm = this.fb.group({
    username: [
      '',
      [Validators.required, NoWhitespaceValidator, WhiteSpaceNotAllowedValidator, NoSpecialCharactersValidator],
    ],
  });

  @ViewChild('confirmChangeUsername') confirmChangeUsername: TemplateRef<any>;

  constructor(
    private authWatchService: LibAuthwatchService,
    private fb: FormBuilder,
    private usersService: AppUsersService,
    private router: Router,
    private dialogService: NbDialogService,
    private userProfileManagerService: UserProfileManagerService,
  ) {}

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((currentUser) => {
      if (currentUser) {
        this.currentUser = currentUser;
        this.currentUsername = this.lastUsername = this.currentUser.username;
        this.usernameForm.patchValue({ username: this.currentUser.username });
      }
    });

    this.userProfileManagerService.updateUsername$.subscribe((value) => {
      if (value) {
        if (!this.router.url.includes('/users/' + this.lastUsername)) {
          this.reloadPage = false;
        }
        if (this.currentUsername !== this.lastUsername) {
          this.setUsername();
        }
        this.userProfileManagerService.setUpdateUsername(false);
      }
    });

    this.checkUsername();
  }

  checkUsername() {
    this.usernameForm.valueChanges
      .pipe(
        debounceTime(800),
        switchMap(() => {
          this.checkingUsername = true;
          this.currentUsername = this.usernameForm.get('username').value;
          return this.usersService.checkUsername(this.currentUsername);
        }),
      )
      .subscribe((data) => {
        this.validUsername = data === true;
        this.checkingUsername = false;
        if (this.currentUsername === this.lastUsername) {
          this.usernameValidation.emit(true);
        } else {
          this.usernameValidation.emit(this.validUsername);
        }
      });
  }

  setUsername() {
    const newUsername = this.usernameForm.get('username').value;
    this.usersService.setUsername(newUsername).subscribe((data) => {
      if (data) {
        // this.toastLogService.successDialog('Updated!');
        this.lastUsername = newUsername;
        if (this.reloadPage) {
          this.router.navigate(['/users', newUsername]).then(() => location.reload());
        }
        this.reloadPage = true;
        // get the user again from the server
        this.authWatchService.checkAlreadySignedIn().subscribe();
      }
    });
  }

  confirmSubmissionDialogueOpen() {
    //open the dialogue to confirm username submission
    this.dialogService.open(this.confirmChangeUsername, {
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
  }
}
