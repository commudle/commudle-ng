import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbToastrModule } from '@nebular/theme';
import { SharedDirectivesModule } from 'projects/shared-directives/shared-directives.module';
import { Error404PageComponent } from './components/error404-page/error404-page.component';
import { LibErrorHandlerComponent } from './lib-error-handler.component';

@NgModule({
  declarations: [LibErrorHandlerComponent, Error404PageComponent],
  imports: [RouterModule, NbToastrModule.forRoot(), NbCardModule, NbButtonModule, SharedDirectivesModule],
  exports: [LibErrorHandlerComponent],
})
export class LibErrorHandlerModule {}
