import { NgModule } from '@angular/core';
import { CompleteUrlPipe } from './complete-url.pipe';
import { NumkeysPipe } from './numkeys.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { TextToLinksPipe } from './text-to-links.pipe';
import { TruncateTextPipe } from './truncate-text.pipe';


@NgModule({
  declarations: [
    CompleteUrlPipe,
    TruncateTextPipe,
    TextToLinksPipe,
    NumkeysPipe,
    SafeHtmlPipe
  ],
  imports: [],
  exports: [
    CompleteUrlPipe,
    TruncateTextPipe,
    TextToLinksPipe,
    NumkeysPipe,
    SafeHtmlPipe
  ]
})
export class SharedPipesModule {
}
