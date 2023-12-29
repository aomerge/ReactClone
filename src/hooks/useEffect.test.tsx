import UseEffect from './useEffect';

describe('UseEffect', () => {
  beforeEach(() => {
    // Reset the effects array before each test
    UseEffect['effects'] = [];
    UseEffect['currentEffectIndex'] = 0;
  });

  it('should create a new effect', () => {
    const effectFn = jest.fn();
    const deps = [1, 2, 3];

    UseEffect.createEffect(effectFn, deps);

    expect(UseEffect['effects']).toEqual([{ effect: effectFn, deps }]);
  });

  it('should run all effects', () => {
    const effectFn1 = jest.fn();
    const effectFn2 = jest.fn();
    const cleanupFn = jest.fn();

    UseEffect.createEffect(effectFn1, []);
    UseEffect.createEffect(effectFn2, []);
    UseEffect.createEffect(() => cleanupFn, []);

    UseEffect.runEffects();

    expect(effectFn1).toHaveBeenCalled();
    expect(effectFn2).toHaveBeenCalled();
    expect(cleanupFn).toHaveBeenCalled();
  });

  it('should not run effects if dependencies have not changed', () => {
    const effectFn = jest.fn();
    const deps = [1, 2, 3];

    UseEffect.createEffect(effectFn, deps);
    UseEffect.createEffect(effectFn, deps);

    UseEffect.runEffects();

    expect(effectFn).toHaveBeenCalledTimes(1);
  });

  it('should run effects if dependencies have changed', () => {
    const effectFn = jest.fn();
    const deps1 = [1, 2, 3];
    const deps2 = [4, 5, 6];

    UseEffect.createEffect(effectFn, deps1);
    UseEffect.createEffect(effectFn, deps2);

    UseEffect.runEffects();

    expect(effectFn).toHaveBeenCalledTimes(2);
  });
});
  beforeEach(() => {
    // Reset the effects array before each test
    UseEffect['effects'] = [];
    UseEffect['currentEffectIndex'] = 0;
  });

  it('should create a new effect', () => {
    const effectFn = jest.fn();
    const deps = [1, 2, 3];

    UseEffect.createEffect(effectFn, deps);

    expect(UseEffect['effects']).toEqual([{ effect: effectFn, deps }]);
  });

  it('should run all effects', () => {
    const effectFn1 = jest.fn();
    const effectFn2 = jest.fn();
    const cleanupFn = jest.fn();

    UseEffect.createEffect(effectFn1, []);
    UseEffect.createEffect(effectFn2, []);
    UseEffect.createEffect(() => cleanupFn, []);

    UseEffect.runEffects();

    expect(effectFn1).toHaveBeenCalled();
    expect(effectFn2).toHaveBeenCalled();
    expect(cleanupFn).toHaveBeenCalled();
  });

  it('should not run effects if dependencies have not changed', () => {
    const effectFn = jest.fn();
    const deps = [1, 2, 3];

    UseEffect.createEffect(effectFn, deps);
    UseEffect.createEffect(effectFn, deps);

    UseEffect.runEffects();

    expect(effectFn).toHaveBeenCalledTimes(1);
  });

  it('should run effects if dependencies have changed', () => {
    const effectFn = jest.fn();
    const deps1 = [1, 2, 3];
    const deps2 = [4, 5, 6];

    UseEffect.createEffect(effectFn, deps1);
    UseEffect.createEffect(effectFn, deps2);

    UseEffect.runEffects();

    expect(effectFn).toHaveBeenCalledTimes(2);
  });
function beforeEach(arg0: () => void) {
  throw new Error('Function not implemented.');
}

