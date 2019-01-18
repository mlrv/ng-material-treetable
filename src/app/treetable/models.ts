export interface BasicNode<T> {
  value: T;
  children: BasicNode<T>[];
}

export interface NodeWithId<T> extends BasicNode<T> {
  id: string;
  children: NodeWithId<T>[];
}

export interface TreeTableNode<T> extends NodeWithId<T> {
  depth: number;
  isVisible: boolean;
  isExpanded: boolean;
}

export interface NodeInTree<T> extends NodeWithId<T> {
  pathToRoot: NodeWithId<T>[];
}

export interface Options<T> {
  verticalSeparator?: boolean;
  capitalisedHeader?: boolean;
  highlightRowOnHover?: boolean;
  customColumnOrder?: Array<keyof T> & string[];
}
