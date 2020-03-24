import { NgModule } from '@angular/core';
import { LibErrorHandlerComponent } from './lib-error-handler.component';
import { NbToastrModule, NbCardBodyComponent, NbCardModule, NbButtonModule } from '@nebular/theme';



@NgModule({
  declarations: [LibErrorHandlerComponent],
  imports: [
    NbToastrModule.forRoot(),
    NbCardModule,
    NbButtonModule
  ],
  exports: [LibErrorHandlerComponent]
})
export class LibErrorHandlerModule { }
