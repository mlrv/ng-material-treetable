import { Component } from '@angular/core';
import { Node } from './treetable/models';
import { mockTree } from './treetable/mocks/mockTree';
import { Mock } from './treetable/mocks/mock';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tree: Node<Mock> = _.cloneDeep(mockTree);
}
