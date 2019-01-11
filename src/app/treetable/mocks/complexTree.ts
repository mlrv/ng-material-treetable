import { Node } from '../models';

export const mockComplexTree: Node<Mock> = {
  id: '1',
  value: {
    Name: 'Reports',
    Owner: 'Eric',
    Protected: true,
    Backup: true
  },
  children: [
    {
      id: '11',
      value: {
        Name: 'Charts',
        Owner: 'Stephanie',
        Protected: false,
        Backup: true
      },
      children: []
    },
    {
      id: '12',
      value: {
        Name: 'Sales',
        Owner: 'Virginia',
        Protected: false,
        Backup: true
      },
      children: []
    },
    {
      id: '13',
      value: {
        Name: 'US',
        Owner: 'Alison',
        Protected: true,
        Backup: false
      },
      children: [
        {
          id: '131',
          value: {
            Name: 'California',
            Owner: 'Claire',
            Protected: false,
            Backup: false
          },
          children: []
        },
        {
          id: '132',
          value: {
            Name: 'Washington',
            Owner: 'Colin',
            Protected: false,
            Backup: true
          },
          children: [
            {
              id: '1321',
              value: {
                Name: 'Domestic',
                Owner: 'Oliver',
                Protected: true,
                Backup: false
              },
              children: []
            },
            {
              id: '1322',
              value: {
                Name: 'International',
                Owner: 'Oliver',
                Protected: true,
                Backup: true
              },
              children: []
            }
          ]
        }
      ]
    }
  ]
};

export interface Mock {
  Name: string;
  Owner: string;
  Protected: boolean;
  Backup: boolean;
}
