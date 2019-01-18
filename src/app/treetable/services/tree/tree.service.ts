import { Injectable } from '@angular/core';
import { BasicNode, NodeWithId, NodeInTree } from '../../models';
import * as _ from 'lodash';
import { Option, some, none } from 'fp-ts/lib/Option';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  traverse<T, K extends BasicNode<T>>(root: K, f: (node: K) => void): void {
    this._traverse(root, (node: K) => {
      f(node);
      return true;
    });
  }

  searchById<T, K extends NodeWithId<T>>(root: K, id: string): Option<NodeInTree<T>> {
    let matchingNode: K;
    const pathToRoot: {[k: string]: K} = {};
    this._traverse(root, (node: K) => {
      node.children.forEach(child => {
        pathToRoot[child.id] = node;
      });
      if (node.id === id) {
        matchingNode = node;
      }
      return node.id !== id;
    });
    return matchingNode ? some({
      id: matchingNode.id,
      value: matchingNode.value,
      children: matchingNode.children,
      pathToRoot: this.buildPath(id, pathToRoot)
    }) : none;
  }

  private _traverse<T, K extends BasicNode<T>>(root: K, f: (node: K) => boolean): void {
    if (!f(root)) {
      return;
    }
    root.children.forEach(c => this._traverse(c, f));
  }

  getNodeDepth<T, K extends NodeWithId<T>>(root: K, node: K): number {
    return this.searchById(root, node.id).fold(-1, n => n.pathToRoot.length);
  }

  flatten<T>(root: BasicNode<T>): BasicNode<T>[] {
    const result = [_.cloneDeep(root)];
    for (let i = 0; i < result.length; i++) {
      const node = result[i];
      if (node.children) {
        result.splice(result.indexOf(node) + 1, 0, ...node.children);
      }
    }
    return result;
  }

  private buildPath<T, K extends NodeWithId<T>>(id: string, pathMap: {[k: string]: K}): K[] {
    const pathToRoot = [];
    let key = id;
    while (key) {
      if (pathMap[key]) {
        pathToRoot.push(pathMap[key]);
        key = pathMap[key].id;
      } else {
        key = null;
      }
    }
    return pathToRoot;
  }

}
