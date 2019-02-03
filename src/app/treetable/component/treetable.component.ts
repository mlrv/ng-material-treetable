import { Component, OnInit, Input, Output, ElementRef } from '@angular/core';
import { Node, TreeTableNode, Options, SearchableNode } from '../models';
import { TreeService } from '../services/tree/tree.service';
import { MatTableDataSource } from '@angular/material';
import { ValidatorService } from '../services/validator/validator.service';
import { ConverterService } from '../services/converter/converter.service';
import { defaultOptions } from '../default.options';
import * as _ from 'lodash';
import { Required } from '../decorators/required.decorator';
import { Subject } from 'rxjs';

@Component({
  selector: 'ng-treetable, treetable', // 'ng-treetable' is currently being deprecated
  templateUrl: './treetable.component.html',
  styleUrls: ['./treetable.component.scss']
})
export class TreetableComponent<T> implements OnInit {
  @Input() @Required tree: Node<T>;
  @Input() options: Options<T> = {};
  @Output() nodeClicked: Subject<TreeTableNode<T>> = new Subject();
  private searchableTree: SearchableNode<T>;
  private treeTable: TreeTableNode<T>[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<TreeTableNode<T>>;

  constructor(
    private treeService: TreeService,
    private validatorService: ValidatorService,
    private converterService: ConverterService,
    elem: ElementRef
  ) {
    const tagName = elem.nativeElement.tagName.toLowerCase();
    if (tagName === 'ng-treetable') {
      console.warn(`DEPRECATION WARNING: \n The 'ng-treetable' selector is being deprecated. Please use the new 'treetable' selector`);
    }
  }

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
    this.searchableTree = this.converterService.toSearchableTree(this.tree);
    const treeTableTree = this.converterService.toTreeTableTree(this.searchableTree);
    this.treeTable = this.treeService.flatten(treeTableTree);
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
      el.isVisible = this.treeService.searchById(this.searchableTree, el.id)
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
