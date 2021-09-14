import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibErrorHandlerComponent } from './lib-error-handler.component';
import { NbToastrModule, NbCardBodyComponent, NbCardModule, NbButtonModule } from '@nebular/theme';
import { Error404PageComponent } from './components/error404-page/error404-page.component';
import { SharedDirectivesModule } from 'projects/shared-directives/shared-directives.module';



@NgModule({
  declarations: [LibErrorHandlerComponent, Error404PageComponent],
  imports: [
    RouterModule,
    NbToastrModule.forRoot(),
    NbCardModule,
    NbButtonModule,
    SharedDirectivesModule 
  ],
  exports: [LibErrorHandlerComponent]
})
export class LibErrorHandlerModule { }
