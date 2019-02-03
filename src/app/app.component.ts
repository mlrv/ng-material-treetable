import { Component } from '@angular/core';
import { Node } from './treetable/models';
import { mockTree } from './treetable/mocks/mockTree';
import { mockTreeAsArrayOfNodes } from './treetable/mocks/mockTreeAsArrayOfNodes';
import { Folder, Task } from './treetable/mocks/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  singleRootTree: Node<Folder> = mockTree;
  arrayOfNodesTree: Node<Task>[] = mockTreeAsArrayOfNodes;
}
