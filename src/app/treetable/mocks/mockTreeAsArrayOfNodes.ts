import { Node } from '../models';
import { Task } from './models';

export const mockTreeAsArrayOfNodes: Node<Task>[] = [
  {
    value: {
      name: 'Tasks for Sprint 1',
      completed: true,
      owner: 'Marco'
    },
    children: [
      {
        value: {
          name: 'Complete feature #123',
          completed: true,
          owner: 'Marco'
        },
        children: []
      },
      {
        value: {
          name: 'Update documentation',
          completed: true,
          owner: 'Jane'
        },
        children: [
          {
            value: {
              name: 'Proofread documentation',
              completed: true,
              owner: 'Bob'
            },
            children: []
          }
        ]
      }
    ]
  },
  {
    value: {
      name: 'Tasks for Sprint 2',
      completed: false,
      owner: 'Erika',
    },
    children: [
      {
        value: {
          name: 'Fix bug #567',
          completed: false,
          owner: 'Marco'
        },
        children: []
      },
      {
        value: {
          name: 'Speak with clients',
          completed: true,
          owner: 'James'
        },
        children: []
      }
    ]
  }
];

