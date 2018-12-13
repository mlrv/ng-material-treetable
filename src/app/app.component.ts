import { Component, OnInit } from '@angular/core';
import { Node, TreeTableNode } from './models';
import { TreeService } from './tree.service';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tree: Node<number>;
  treeTable: Node<number>[];
  displayedColumns: string[] = ['value'];
  dataSource: MatTableDataSource<Node<number>>;

  constructor(private treeService: TreeService) { }

  ngOnInit() {
    this.tree = _.cloneDeep(exampleTree);
    this.treeService.traverse(this.tree, (node: TreeTableNode<number>) => {
      node.depth = this.treeService.getNodeDepth(exampleTree, node);
      node.isExpanded = true;
      node.isVisible = true;
    });
    this.treeTable = this.treeService.flatten(this.tree);
    this.dataSource = new MatTableDataSource(this.treeTable);
  }

  formatIndentation(element: TreeTableNode<number>, step: number = 3): string {
    return '&nbsp;'.repeat(element.depth * step) + element.value;
  }
}

export const exampleTree: Node<number> = {
  value: 1,
  id: '1',
  children: [
    {
      value: 2,
      id: '2',
      children: []
    },
    {
      value: 3,
      id: '3',
      children: [
        {
          value: 4,
          id: '4',
          children: []
        }
      ]
    }
  ]
};
