# Angular Material TreeTable Component

[![Build Status](https://travis-ci.com/mlrv/ng-material-treetable.svg?branch=master)](https://travis-ci.com/mlrv/ng-material-tree-table)

WIP... stay tuned for the first release!

[Live Demo](http://ng-material-treetable.surge.sh/)

![Gif Demo](https://github.com/mlrv/ng-material-treetable/blob/master/assets/readme-gif.gif)

## Installation

Simply install the package through `npm`

```
npm i ng-material-treetable --save
```

import the main module

```typescript
import { TreetableModule } from 'ng-material-treetable';

@NgModule({
    ...
  imports: [
    ...
    TreetableModule
  ],
  ...
})
export class AppModule { }
```

and use the component in your template

```html
<ng-treetable [tree]="yourTreeDataStructure"></ng-treetable>
```


## Data Format

The tree object that's rendered by the component needs to satisfy a very simple `Node` interface

```typescript
interface Node<T> {
  value: T;
  children: Node<T>[];
}
```

Here's a simple example.


```javascript
{
  value: {
    name: 'Reports',
    owner: 'Eric',
    protected: true,
    backup: true
  },
  children: [
    {
      value: {
        name: 'Charts',
        owner: 'Stephanie',
        protected: false,
        backup: true
      },
      children: []
    },
    {
      value: {
        name: 'Sales',
        owner: 'Virginia',
        protected: false,
        backup: true
      },
      children: []
    },
    {
      value: {
        name: 'US',
        owner: 'Alison',
        protected: true,
        backup: false
      },
      children: [
        {
          value: {
            name: 'California',
            owner: 'Claire',
            protected: false,
            backup: false
          },
          children: []
        },
        {
          value: {
            name: 'Washington',
            owner: 'Colin',
            protected: false,
            backup: true
          },
          children: [
            {
              value: {
                name: 'Domestic',
                owner: 'Oliver',
                protected: true,
                backup: false
              },
              children: []
            },
            {
              value: {
                name: 'International',
                owner: 'Oliver',
                protected: true,
                backup: true
              },
              children: []
            }
          ]
        }
      ]
    }
  ]
};
```