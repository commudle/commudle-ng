import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@commudle/auth';
import { NbToastrService } from '@commudle/theme';
import { EmailCodeService } from 'apps/shared-services/email-code.service';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { GoogleTagManagerService } from '../../services/google-tag-manager.service';

@Component({
  selector: 'commudle-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isEmailSent = false;
  isLoading = false;

  subscriptions: Subscription[] = [];

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
  ) {
    this.seoService.noIndex(true);

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
            this.libAuthWatchService.signIn(user.provider.toLowerCase(), user.idToken).subscribe((data: any) => {
              this.setCookie(data.auth_token, 'google');
            });
          }
        }),
      );
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.seoService.noIndex(false);

    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  setCookie(authToken: string, loginType: string): void {
    this.cookieService.set('commudle_user_auth', authToken);
    this.gtm.dataLayerPushEvent('login', { com_login_type: loginType });
    this.redirect();
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
        () => {
          this.isEmailSent = true;
          this.nbToastrService.success(`Verification code sent to ${this.loginForm.value.email}`, 'Success');
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
}
