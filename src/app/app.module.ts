import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TreetableModule } from './treetable/treetable.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TreetableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
