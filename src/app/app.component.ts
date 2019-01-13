import { Component } from '@angular/core';
import { Node, Options } from './treetable/models';
import { mockComplexTree, Mock } from './treetable/mocks/complexTree';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tree: Node<Mock> = _.cloneDeep(mockComplexTree);
  options: Options<Mock> = {
    customColumnOrder: ['backup', 'owner', 'protected', 'name']
  };
}
