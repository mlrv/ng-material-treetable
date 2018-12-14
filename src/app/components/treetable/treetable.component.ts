import { Component, OnInit } from '@angular/core';
import { Node, TreeTableNode } from '../../models';
import { TreeService } from '../../services/tree.service';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-treetable',
  templateUrl: './treetable.component.html',
  styleUrls: ['./treetable.component.scss']
})
export class TreetableComponent implements OnInit {
  tree: Node<number>;
  treeTable: TreeTableNode<number>[];
  displayedColumns: string[] = ['value'];
  dataSource: MatTableDataSource<TreeTableNode<number>>;

  constructor(private treeService: TreeService) { }

  ngOnInit() {
    this.tree = _.cloneDeep(exampleTree);
    this.treeService.traverse(this.tree, (node: TreeTableNode<number>) => {
      node.depth = this.treeService.getNodeDepth(exampleTree, node);
      node.isExpanded = true;
      node.isVisible = true;
    });
    this.treeTable = this.treeService.flatten(this.tree) as TreeTableNode<number>[];
    this.generateTable();
  }

  generateTable() {
    this.dataSource = new MatTableDataSource(this.treeTable.filter(x => x.isVisible));
  }

  formatIndentation(element: TreeTableNode<number>, step: number = 3): string {
    return '&nbsp;'.repeat(element.depth * step) + element.value;
  }

  onElementClick(clickedElement: TreeTableNode<number>): void {
    clickedElement.isExpanded = !clickedElement.isExpanded;
    this.treeTable.forEach(el => {
      el.isVisible = this.treeService.searchById(exampleTree, el.id)
        .pathToRoot
        .every(p => this.treeTable.find(x => x.id === p.id).isExpanded);
    });
    this.generateTable();
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

