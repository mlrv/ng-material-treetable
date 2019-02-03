import { TestBed } from '@angular/core/testing';
import { ValidatorService } from './validator.service';
import { mockSearchableTree } from '../../mocks/mockSearchableTree';
import { Mock } from '../../mocks/mock';

describe('ValidatorService', () => {

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidatorService = TestBed.get(ValidatorService);
    expect(service).toBeTruthy();
  });

  it('should correctly process valid customColumnOrders', () => {
    const service: ValidatorService = TestBed.get(ValidatorService);
    const validCustomOrder: Array<keyof Mock>  =  ['backup', 'owner', 'protected', 'name'];
    expect(service.validateCustomOrder(mockSearchableTree, validCustomOrder)).toEqual({
      valid: true,
      xor: []
    });
  });

  it('should correctly process invalid customColumnOrders with missing properties', () => {
    const service: ValidatorService = TestBed.get(ValidatorService);
    const invalidCustomOrder: Array<keyof Mock>  =  ['backup', 'owner', 'protected'];
    expect(service.validateCustomOrder(mockSearchableTree, invalidCustomOrder)).toEqual({
      valid: false,
      xor: ['name']
    });
  });

  it('should correctly process invalid customColumnOrders with incorrect properties', () => {
    const service: ValidatorService = TestBed.get(ValidatorService);
    const invalidCustomOrder: any  =  ['backup', 'owner', 'protected', 'name', 'notAValidProperty'];
    expect(service.validateCustomOrder(mockSearchableTree, invalidCustomOrder)).toEqual({
      valid: false,
      xor: ['notAValidProperty']
    });
  });

  it('should correctly process invalid customColumnOrders with incorrect and missing properties', () => {
    const service: ValidatorService = TestBed.get(ValidatorService);
    const invalidCustomOrder: any  =  ['backup', 'protected', 'name', 'notAValidProperty'];
    expect(service.validateCustomOrder(mockSearchableTree, invalidCustomOrder)).toEqual({
      valid: false,
      xor: ['owner', 'notAValidProperty']
    });
  });

});
