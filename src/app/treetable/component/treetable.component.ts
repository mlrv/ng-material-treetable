import { Component, OnInit, Input, Output } from '@angular/core';
import { Node, TreeTableNode, Options, SearchableNode } from '../models';
import { TreeService } from '../services/tree/tree.service';
import { MatTableDataSource } from '@angular/material';
import { ValidatorService } from '../services/validator/validator.service';
import { defaultOptions } from '../default.options';
import * as _ from 'lodash';
import { Required } from '../decorators/required.decorator';
import { Subject } from 'rxjs';
const uuidv4 = require('uuid/v4');

@Component({
  selector: 'app-treetable',
  templateUrl: './treetable.component.html',
  styleUrls: ['./treetable.component.scss']
})
export class TreetableComponent<T> implements OnInit {
  @Input() @Required tree: Node<T>;
  @Input() options: Options<T> = {};
  @Output() nodeClicked: Subject<TreeTableNode<T>> = new Subject();
  treeTable: TreeTableNode<T>[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<TreeTableNode<T>>;

  constructor(private treeService: TreeService, private validatorService: ValidatorService) { }

  ngOnInit() {
    this.options = this.parseOptions(defaultOptions);
    const customOrderValidator = this.validatorService.validateCustomOrder(this.tree, this.options.customColumnOrder);
    if (this.options.customColumnOrder && !customOrderValidator.valid) {
      throw new Error(`
        Properties ${customOrderValidator.xor.map(x => `'${x}'`).join(', ')} incorrect or missing in customColumnOrder`
      );
    }
    this.displayedColumns = this.options.customColumnOrder
      ? this.options.customColumnOrder
      : this.extractNodeProps(this.tree);
    this.treeService.traverse(this.tree, (node: TreeTableNode<T>) => {
      node.id = uuidv4();
      node.depth = this.treeService.getNodeDepth(this.tree as SearchableNode<T>, node);
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

  formatIndentation(node: TreeTableNode<T>, step: number = 5): string {
    return '&nbsp;'.repeat(node.depth * step);
  }

  onNodeClick(clickedNode: TreeTableNode<T>): void {
    clickedNode.isExpanded = !clickedNode.isExpanded;
    this.treeTable.forEach(el => {
      el.isVisible = this.treeService.searchById(this.tree as SearchableNode<T>, el.id)
        .fold([], n => n.pathToRoot)
        .every(p => this.treeTable.find(x => x.id === p.id).isExpanded);
    });
    this.dataSource = this.generateDataSource();
    this.nodeClicked.next(clickedNode);
  }

  // Overrides default options with those specified by the user
  parseOptions(defaultOpts: Options<T>): Options<T> {
    return _.defaults(this.options, defaultOpts);
  }

}
