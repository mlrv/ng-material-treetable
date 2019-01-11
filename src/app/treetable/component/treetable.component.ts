import { Component, OnInit, Input } from '@angular/core';
import { Node, TreeTableNode, Options } from '../models';
import { TreeService } from '../services/tree/tree.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-treetable',
  templateUrl: './treetable.component.html',
  styleUrls: ['./treetable.component.scss']
})
export class TreetableComponent<T> implements OnInit {
  @Input() tree: Node<T>;
  @Input() options: Options;
  treeTable: TreeTableNode<T>[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<TreeTableNode<T>>;

  constructor(private treeService: TreeService) { }

  ngOnInit() {
    this.displayedColumns = this.extractNodeProps(this.tree);
    this.treeService.traverse(this.tree, (node: TreeTableNode<T>) => {
      node.depth = this.treeService.getNodeDepth(this.tree, node);
      node.isExpanded = true;
      node.isVisible = true;
    });
    this.treeTable = this.treeService.flatten(this.tree) as TreeTableNode<T>[];
    this.dataSource = this.generateDataSource();
  }

  extractNodeProps(tree: Node<T> & { value: { [k: string]: any } }): string[] {
    return Object.keys(tree.value).filter(x => typeof tree.value[x] !== 'object');
  }

  generateDataSource(): MatTableDataSource<TreeTableNode<T>> {
    return new MatTableDataSource(this.treeTable.filter(x => x.isVisible));
  }

  formatIndentation(element: TreeTableNode<number>, step: number = 5): string {
    return '&nbsp;'.repeat(element.depth * step);
  }

  onElementClick(clickedElement: TreeTableNode<number>): void {
    clickedElement.isExpanded = !clickedElement.isExpanded;
    this.treeTable.forEach(el => {
      el.isVisible = this.treeService.searchById(this.tree, el.id)
        .fold([], n => n.pathToRoot)
        .every(p => this.treeTable.find(x => x.id === p.id).isExpanded);
    });
    this.dataSource = this.generateDataSource();
  }
}
