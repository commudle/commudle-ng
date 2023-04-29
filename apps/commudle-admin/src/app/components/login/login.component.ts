import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@commudle/auth';
import { NbToastrService } from '@commudle/theme';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { EmailCodeService } from 'apps/shared-services/email-code.service';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { NbDialogService, NbDialogRef } from '@commudle/theme';
import { LoginConsentPopupComponent } from '../login-consent-popup/login-consent-popup.component';
@Component({
  selector: 'commudle-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isEmailSent = false;
  isLoading = false;
  dialogRef: NbDialogRef<any>;

  subscriptions: Subscription[] = [];

  consent_privacy_tnc = false;
  consent_marketing = false;

  private authService: AuthService;

  constructor(
    public libAuthWatchService: LibAuthwatchService,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private fb: FormBuilder,
    private emailCodeService: EmailCodeService,
    private nbToastrService: NbToastrService,
    private injector: Injector,
    private gtm: GoogleTagManagerService,
    private dialogService: NbDialogService,
  ) {
    this.subscriptions.push(
      this.libAuthWatchService.currentUserVerified$.subscribe((value: boolean) => {
        if (value) {
          this.redirect();
        }
      }),
    );

    if (this.libAuthWatchService.getAuthCookie() === null) {
      this.authService = this.injector.get(AuthService);

      this.subscriptions.push(
        this.authService.authState.subscribe((user) => {
          if (user) {
            this.libAuthWatchService
              .signIn(user.provider.toLowerCase(), this.consent_privacy_tnc, this.consent_marketing, user.idToken)
              .subscribe((data: any) => {
                if (!(data.consent || this.consent_privacy_tnc)) {
                  this.openDialog('google');
                } else {
                  this.setCookie(data.auth_token, 'google');
                }
              });
          }
        }),
      );
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      consent_privacy_tnc: [''],
      consent_marketing: [''],
    });
  }

  ngOnInit(): void {
    this.seoService.setTags(
      'Login or Sign Up',
      'Enter the world of techies and knowledge, just one step to begin your journey. Login or sign up now!',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  setCookie(authToken: string, loginType: string): void {
    this.cookieService.set(environment.auth_cookie_name, authToken, {
      path: '/',
      ...(environment.production && { domain: '.commudle.com' }),
      expires: 30,
    });
    this.redirect();
    this.gtm.dataLayerPushEvent('login', { com_login_type: loginType });
  }

  redirect(): void {
    window.location.href = this.activatedRoute.snapshot.queryParams.redirect
      ? window.location.origin + this.activatedRoute.snapshot.queryParams.redirect
      : window.location.origin || '/';
  }

  sendVerificationEmail(): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.emailCodeService.sendVerificationEmail(this.loginForm.value.email).subscribe(
        (response) => {
          if (!(response.consent || this.consent_privacy_tnc)) {
            this.openDialog('code');
          } else {
            this.isEmailSent = true;
            this.nbToastrService.success(`Verification code sent to ${this.loginForm.value.email}`, 'Success');
          }
        },
        () => this.nbToastrService.danger('Error in generating code, try again in a few minutes!', 'Error'),
        () => (this.isLoading = false),
      ),
    );
  }

  loginUser(): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.emailCodeService.loginUser(this.loginForm.value).subscribe(
        (data: any) => this.setCookie(data.auth_token, 'otp'),
        () => this.nbToastrService.danger('Error while trying to log you in, try again in a few minutes!', 'Error'),
        () => (this.isLoading = false),
      ),
    );
  }

  openDialog(loginType) {
    const dialogRef = this.dialogService.open(LoginConsentPopupComponent, {
      hasBackdrop: true,
      closeOnBackdropClick: false,
    });
    dialogRef.componentRef.instance.consentValueChangedOutput.subscribe((consent: any) => {
      this.consent_privacy_tnc = consent.consent_privacy_tnc;
      this.consent_marketing = consent.consent_marketing;
      this.loginForm.controls['consent_privacy_tnc'].setValue(consent.consent_privacy_tnc);
      this.loginForm.controls['consent_marketing'].setValue(consent.consent_marketing);
      if (loginType === 'code') {
        this.sendVerificationEmail();
      } else if (loginType === 'google' && this.consent_privacy_tnc) {
        this.loginWithGoogle();
      }

      dialogRef.close();
    });
  }

  loginWithGoogle() {
    this.subscriptions.push(
      this.authService.authState.subscribe((user) => {
        if (user) {
          this.libAuthWatchService
            .signIn(user.provider.toLowerCase(), this.consent_privacy_tnc, this.consent_marketing, user.idToken)
            .subscribe((data: any) => {
              if (!(data.consent || this.consent_privacy_tnc)) {
                this.openDialog('google');
              } else {
                this.setCookie(data.auth_token, 'google');
              }
            });
        }
      }),
    );
  }
}
