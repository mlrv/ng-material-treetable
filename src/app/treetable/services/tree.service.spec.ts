import { TestBed } from '@angular/core/testing';
import { TreeService } from './tree.service';
import * as _ from 'lodash';
import { mockTree } from '../mocks/mockTree';
import { some, none } from 'fp-ts/lib/Option';
import { Node } from '../models';

describe('TreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TreeService = TestBed.get(TreeService);
    expect(service).toBeTruthy();
  });

  it('should search for a node in a tree and return it warapped in Option<> if present', () => {
    const service: TreeService = TestBed.get(TreeService);
    const tree = _.cloneDeep(mockTree);
    const expectedNode = tree.children[0];
    const expectedPathToRoot = [tree];
    const id = expectedNode.id;
    expect(service.searchById(tree, id)).toEqual(some({
      ...expectedNode,
      pathToRoot: expectedPathToRoot
    }));
  });

  it('should search for a node in a tree and return none if not present', () => {
    const service: TreeService = TestBed.get(TreeService);
    const tree = _.cloneDeep(mockTree);
    const id = '00000';
    expect(service.searchById(tree, id)).toEqual(none);
  });

  it('should traverse a tree and apply a function to all nodes', () => {
    const service: TreeService = TestBed.get(TreeService);
    const tree = _.cloneDeep(mockTree);
    service.traverse(tree, node => node.value++);
    const compareNode = (originalNode: Node<number>, newNode: Node<number>) => newNode.value === originalNode.value + 1;
    service.traverse(mockTree, n => {
      expect(compareNode(n, service.searchById(tree, n.id).fold(null, x => x))).toBe(true);
    });
  });

  it('should correctly flatten a tree', () => {
    const service: TreeService = TestBed.get(TreeService);
    const tree = _.cloneDeep(mockTree);
    const expectedFlattenedTree = [
      tree,
      tree.children[0],
      tree.children[1],
      tree.children[1].children[0]
    ];
    expect(service.flatten(tree)).toEqual(expectedFlattenedTree);
  });

  it('should return the depth of a node that\'s in the tree', () => {
    const service: TreeService = TestBed.get(TreeService);
    const tree = _.cloneDeep(mockTree);
    const firstLevelNode = tree.children[0];
    const secondLevelNode = tree.children[1].children[0];
    expect(service.getNodeDepth(tree, tree)).toEqual(0);
    expect(service.getNodeDepth(tree, firstLevelNode)).toEqual(1);
    expect(service.getNodeDepth(tree, secondLevelNode)).toEqual(2);
  });

  it('should return a depth of -1 when the node is not in the tree', () => {
    const service: TreeService = TestBed.get(TreeService);
    const tree = _.cloneDeep(mockTree);
    const node: Node<number> = {
      id: '0000',
      value: 123,
      children: []
    };
    expect(service.getNodeDepth(tree, node)).toEqual(-1);
  });

});
