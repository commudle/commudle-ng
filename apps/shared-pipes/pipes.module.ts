import { NgModule } from '@angular/core';
import { CapitalizeAndRemoveUnderscorePipe } from './capitalize-and-remove-underscore.pipe';
import { CompleteUrlPipe } from './complete-url.pipe';
import { EnumFormatPipe } from './enum-format.pipe';
import { NumkeysPipe } from './numkeys.pipe';
import { OrderByPipe } from './order-by.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { SafePipe } from './safe.pipe';
import { SearchByPipe } from './search-by.pipe';
import { SortByPipe } from './sort-by.pipe';
import { TextToLinksPipe } from './text-to-links.pipe';
import { TruncateTextPipe } from './truncate-text.pipe';
import { GroupByDatePipe } from './group-by.pipe';

@NgModule({
  declarations: [
    CompleteUrlPipe,
    TruncateTextPipe,
    TextToLinksPipe,
    NumkeysPipe,
    SafeHtmlPipe,
    SafeUrlPipe,
    SearchByPipe,
    OrderByPipe,
    SortByPipe,
    SafePipe,
    EnumFormatPipe,
    CapitalizeAndRemoveUnderscorePipe,
    GroupByDatePipe,
  ],
  imports: [],
  exports: [
    CompleteUrlPipe,
    TruncateTextPipe,
    TextToLinksPipe,
    NumkeysPipe,
    SafeHtmlPipe,
    SafeUrlPipe,
    SearchByPipe,
    OrderByPipe,
    SortByPipe,
    SafePipe,
    EnumFormatPipe,
    CapitalizeAndRemoveUnderscorePipe,
    GroupByDatePipe,
  ],
})
export class SharedPipesModule {}
