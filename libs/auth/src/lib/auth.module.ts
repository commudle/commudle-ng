import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthService, AuthServiceConfig } from './auth.service';
import { GoogleSigninButtonDirective } from './directives/google-signin-button.directive';

@NgModule({
  declarations: [GoogleSigninButtonDirective],
  imports: [CommonModule],
  providers: [AuthService],
  exports: [GoogleSigninButtonDirective],
})
export class AuthModule {
  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error('SocialLoginModule is already loaded. Import it in the AppModule only');
    }
  }

  public static initialize(config: AuthServiceConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        {
          provide: 'SocialAuthServiceConfig',
          useValue: config,
        },
      ],
    };
  }
}
