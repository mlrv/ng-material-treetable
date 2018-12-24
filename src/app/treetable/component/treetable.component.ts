import { Component, OnInit } from '@angular/core';
import { Node, TreeTableNode } from '../models';
import { TreeService } from '../services/tree.service';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material';
import { mockTree } from '../mocks/mockTree';

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
    this.tree = _.cloneDeep(mockTree);
    this.treeService.traverse(this.tree, (node: TreeTableNode<number>) => {
      node.depth = this.treeService.getNodeDepth(mockTree, node);
      node.isExpanded = true;
      node.isVisible = true;
    });
    this.treeTable = this.treeService.flatten(this.tree) as TreeTableNode<number>[];
    this.generateTable();
  }

  generateTable() {
    this.dataSource = new MatTableDataSource(this.treeTable.filter(x => x.isVisible));
  }

  formatIndentation(element: TreeTableNode<number>, step: number = 5): string {
    return '&nbsp;'.repeat(element.depth * step);
  }

  onElementClick(clickedElement: TreeTableNode<number>): void {
    clickedElement.isExpanded = !clickedElement.isExpanded;
    this.treeTable.forEach(el => {
      el.isVisible = this.treeService.searchById(mockTree, el.id)
        .fold([], n => n.pathToRoot)
        .every(p => this.treeTable.find(x => x.id === p.id).isExpanded);
    });
    this.generateTable();
  }
}
