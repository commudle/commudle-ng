import { TruncateTextPipe } from './truncate-text.pipe';
import { NgModule } from '@angular/core';
import { CompleteUrlPipe } from './complete-url.pipe';



@NgModule({
  declarations: [
    CompleteUrlPipe,
    TruncateTextPipe
  ],
  imports: [
  ],
  exports: [
    CompleteUrlPipe,
    TruncateTextPipe
  ]
})
export class SharedPipesModule { }
