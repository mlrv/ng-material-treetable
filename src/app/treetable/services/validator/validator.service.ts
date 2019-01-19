import { Injectable } from '@angular/core';
import { Node } from '../../models';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  validateCustomOrder<T, K extends Node<T>>(node: K, customColumnOrder: Array<keyof T> & string[]): { valid: boolean, xor: string[] } {
    const xor = _.xor(Object.keys(node.value), customColumnOrder);
    return {
      valid: _.isEmpty(xor),
      xor
    };
  }

}
