import { Component } from '@angular/core';
import { Node, Options } from './treetable/models';
import { mockTree, Mock } from './treetable/mocks/mockTree';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tree: Node<Mock> = _.cloneDeep(mockTree);
  options: Options<Mock> = {
    customColumnOrder: ['backup', 'owner', 'protected', 'name']
  };
}
