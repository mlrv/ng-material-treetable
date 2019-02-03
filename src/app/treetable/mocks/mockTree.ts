import { Node } from '../models';
import { Folder } from './models';

export const mockTree: Node<Folder> = {
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

