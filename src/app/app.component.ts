import { Component } from '@angular/core';
import { BasicNode } from './treetable/models';
import { mockBasicTree, Mock } from './treetable/mocks/mockBasicTree';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tree: BasicNode<Mock> = _.cloneDeep(mockBasicTree);
}
