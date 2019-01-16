import { Required } from './required.decorator';

describe('RequiredDecorator', () => {

  it('should create', () => {
    expect(Required).toBeTruthy();
  });

  it('should throw an error when a required property is not defined', () => {
    const target: any = {};
    const property = 'requiredProp';
    const errorMessage = `Input '${property}' is required. Have you forgotten to add [${property}] = ... in your template?`;
    Required(target, property);
    expect(() => target.requiredProp).toThrowError(errorMessage);
  });

  it('should not throw an error when a required property is defined', () => {
    const target: any = {};
    const property = 'requiredProp';
    Required(target, property);
    target.requiredProp = true;
    expect(target.requiredProp).toEqual(true);
  });

});
