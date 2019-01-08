import { Component } from '@angular/core';
import { Node } from './treetable/models';
import { mockComplexTree, Mock } from './treetable/mocks/mockTree';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tree: Node<Mock> = _.cloneDeep(mockComplexTree);
}
