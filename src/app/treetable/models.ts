export interface Node<T> {
  id: string;
  value: T;
  children: Node<T>[];
}

export interface TreeTableNode<T> extends Node<T> {
  depth: number;
  isVisible: boolean;
  isExpanded: boolean;
}

export interface NodeInTree<T> extends Node<T> {
  pathToRoot: Node<T>[];
}
