import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { TreetableComponent } from './component/treetable.component';
export { Node, Options} from './models';

@NgModule({
  declarations: [
    TreetableComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule
  ],
  exports: [
    TreetableComponent
  ]
})
export class TreetableModule { }
