import { TestBed } from '@angular/core/testing';
import { TreeService } from './tree.service';
import * as _ from 'lodash-es';
import { mockSearchableTree } from '../../mocks/mockSearchableTree';
import { Folder } from '../../mocks/models';
import { some, none } from 'fp-ts/lib/Option';
import { SearchableNode, NodeInTree } from '../../models';

describe('TreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TreeService = TestBed.get(TreeService);
    expect(service).toBeTruthy();
  });

  it('should search for a node in a tree and return it warapped in Option<> if present', () => {
    const service: TreeService = TestBed.get(TreeService);
    const tree = _.cloneDeep(mockSearchableTree);
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
    const tree = _.cloneDeep(mockSearchableTree);
    const id = '00000';
    expect(service.searchById(tree, id)).toEqual(none);
  });

  it('should traverse a tree and apply a function to all nodes', () => {
    const service: TreeService = TestBed.get(TreeService);
    const tree = _.cloneDeep(mockSearchableTree);
    service.traverse(tree, node => node.value.name = node.value.name.toUpperCase());
    const compareNode = (originalNode: SearchableNode<Folder>, newNode: NodeInTree<Folder>) => {
      return newNode.value.name === originalNode.value.name.toUpperCase();
    };
    service.traverse(mockSearchableTree, n => {
      expect(compareNode(n, service.searchById(tree, n.id).fold(null, x => x) as NodeInTree<Folder>)).toBe(true);
    });
  });

  it('should correctly flatten a tree', () => {
    const service: TreeService = TestBed.get(TreeService);
    const tree = _.cloneDeep(mockSearchableTree);
    const expectedFlattenedTree = [
      tree,
      tree.children[0],
      tree.children[1],
      tree.children[2],
      tree.children[2].children[0],
      tree.children[2].children[1],
      tree.children[2].children[1].children[0],
      tree.children[2].children[1].children[1]
    ];
    expect(service.flatten(tree)).toEqual(expectedFlattenedTree);
  });

  it('should return the depth of a node that\'s in the tree', () => {
    const service: TreeService = TestBed.get(TreeService);
    const tree = _.cloneDeep(mockSearchableTree);
    const firstLevelNode = tree.children[0];
    const secondLevelNode = tree.children[2].children[0];
    const thirdLevelNode = tree.children[2].children[1].children[0];
    expect(service.getNodeDepth(tree, tree)).toEqual(0);
    expect(service.getNodeDepth(tree, firstLevelNode)).toEqual(1);
    expect(service.getNodeDepth(tree, secondLevelNode)).toEqual(2);
    expect(service.getNodeDepth(tree, thirdLevelNode)).toEqual(3);
  });

  it('should return a depth of -1 when the node is not in the tree', () => {
    const service: TreeService = TestBed.get(TreeService);
    const tree = _.cloneDeep(mockSearchableTree);
    const node: SearchableNode<Folder> = {
      id: '0000',
      value: {
        name: 'name',
        backup: true,
        owner: 'owner',
        protected: false
      },
      children: []
    };
    expect(service.getNodeDepth(tree, node)).toEqual(-1);
  });

});
