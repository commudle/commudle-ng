import { Directive, ElementRef, Input } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from '../auth.service';

declare let google: any;

@Directive({
  selector: '[google-signin-button]',
})
export class GoogleSigninButtonDirective {
  @Input()
  type: 'icon' | 'standard' = 'icon';

  @Input()
  size: 'small' | 'medium' | 'large' = 'medium';

  @Input()
  text: 'signin_with' | 'signup_with' | 'continue_with' = 'continue_with';

  @Input()
  shape: 'square' | 'circle' | 'pill' | 'rectangular' = 'rectangular';

  @Input()
  theme: 'outline' | 'filled_blue' | 'filled_black' = 'outline';

  @Input()
  logo_alignment: 'left' | 'center' = 'left';

  @Input()
  width = '';

  @Input()
  locale = '';

  constructor(el: ElementRef, authService: AuthService) {
    authService.initState.pipe(take(1)).subscribe(() => {
      Promise.resolve(this.width).then((value) => {
        if (value > '400' || (value < '200' && value != '')) {
          Promise.reject(
            'Please note .. max-width 400 , min-width 200 ' +
              '(https://developers.google.com/identity/gsi/web/tools/configurator)',
          );
        } else {
          google.accounts.id.renderButton(el.nativeElement, {
            type: this.type,
            size: this.size,
            text: this.text,
            width: this.width,
            shape: this.shape,
            theme: this.theme,
            logo_alignment: this.logo_alignment,
            locale: this.locale,
          });
        }
      });
    });
  }
}
