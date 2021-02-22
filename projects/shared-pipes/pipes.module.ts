import { TruncateTextPipe } from './truncate-text.pipe';
import { NgModule } from '@angular/core';
import { CompleteUrlPipe } from './complete-url.pipe';
import { TextToLinksPipe } from './text-to-links.pipe';
import { NumkeysPipe } from './numkeys.pipe';



@NgModule({
  declarations: [
    CompleteUrlPipe,
    TruncateTextPipe,
    TextToLinksPipe,
    NumkeysPipe

  ],
  imports: [
  ],
  exports: [
    CompleteUrlPipe,
    TruncateTextPipe,
    TextToLinksPipe,
    NumkeysPipe

  ]
})
export class SharedPipesModule { }
