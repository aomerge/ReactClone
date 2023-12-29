/**
 * Represents a utility class for managing effects in React components.
 */
export default class UseEffect {
  private static effects: Array<{ effect: Function; deps: any[]; cleanup?: Function }> = [];
  private static currentEffectIndex: number = 0;

  //public methods
  /**
   * Runs all the effects.
   */
  public static runEffects() {
    this.effects.forEach((effectObj) => {
      if (effectObj) {
        const { effect } = effectObj;
        const cleanup = effect();
        if (typeof cleanup === 'function') {
          effectObj.cleanup = cleanup;
        }
      }
    });
  }

  // private methods
  /**
   * Creates a new effect.
   * @param effect - The effect function to run.
   * @param deps - The dependencies of the effect.
   */
  public static createEffect(effect: Function, deps: any[]) {
    const hasDepsChanged = this.depsChanged(deps, this.currentEffectIndex);
    if (hasDepsChanged) {
      this.effects[this.currentEffectIndex] = { effect, deps };
    }
    this.currentEffectIndex++;
  }

  /**
   * Checks if the dependencies have changed.
   * @param newDeps - The new dependencies to compare.
   * @param index - The index of the effect.
   * @returns True if the dependencies have changed, false otherwise.
   */
  private static depsChanged(newDeps: any[], index: number): boolean {
    if (!this.effects[index]) return true;
    const { deps: oldDeps } = this.effects[index];
    return newDeps.some((dep, i) => dep !== oldDeps[i]);
  }
}
