import { Injectable } from '@angular/core';
import { Node, NodeInTree } from './models';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  traverse<T>(root: Node<T>, f: (node: Node<T>) => void): void {
    this._traverse(root, (node: Node<T>) => {
      f(node);
      return true;
    });
  }

  searchById<T>(root: Node<T>, id: string): NodeInTree<T> {
    let matchingNode: Node<T>;
    const pathToRoot = new Map<string, Node<T>>();
    this._traverse(root, (node: Node<T>) => {
      matchingNode = node;
      node.children.forEach(child => {
        pathToRoot[child.id] = node;
      });
      return node.id !== id;
    });
    return {
      ...matchingNode,
      pathToRoot: this.buildPath(id, pathToRoot)
    };
  }

  private _traverse<T>(root: Node<T>, f: (node: Node<T>) => boolean): void {
    const stack = [];
    if (root) {
      stack.push(root);
      while (stack.length > 0) {
        const node = stack.pop();
        if (!f(node)) {
          return;
        }
        node.children.forEach(item => {
          stack.push(item);
        });
      }
    }
  }

  getNodeDepth<T>(root: Node<T>, node: Node<T>): number {
    return this.searchById(root, node.id).pathToRoot.length;
  }

  flatten<T>(root: Node<T>): Node<T>[] {
    const result = [_.cloneDeep(root)];
    for (let i = 0; i < result.length; i++) {
      const node = result[i];
      if (node.children) {
        result.splice(result.indexOf(node) + 1, 0, ...node.children);
      }
    }
    return result;
  }

  private buildPath<T>(id: string, pathMap: Map<string, Node<T>>): Node<T>[] {
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
