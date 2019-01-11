import { Node } from '../models';

export const numberTree: Node<number> = {
  value: 1,
  id: '1',
  children: [
    {
      value: 2,
      id: '2',
      children: []
    },
    {
      value: 3,
      id: '3',
      children: [
        {
          value: 4,
          id: '4',
          children: []
        }
      ]
    }
  ]
};
