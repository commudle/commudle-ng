import { TruncateTextPipe } from './truncate-text.pipe';
import { NgModule } from '@angular/core';
import { CompleteUrlPipe } from './complete-url.pipe';
import { TextToLinksPipe } from './text-to-links.pipe';



@NgModule({
  declarations: [
    CompleteUrlPipe,
    TruncateTextPipe,
    TextToLinksPipe,

  ],
  imports: [
  ],
  exports: [
    CompleteUrlPipe,
    TruncateTextPipe,
    TextToLinksPipe,

  ]
})
export class SharedPipesModule { }
