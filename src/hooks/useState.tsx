import { ReactClone } from "../reactClone/reactClone";

type StateTuple = [any, (newValue: any) => any];

/**
 * A class that manages state in a React-like manner by implementing a custom useState hook.
 * Extends the ReactClone base class to provide state management functionality.
 * 
 * This class maintains a global state store and handles state updates, component re-rendering,
 * and hook indices to ensure proper state management across component lifecycles.
 * 
 * The state management system includes:
 * - A global state store that maps unique IDs to state values
 * - Hook indexing to track multiple state hooks within a single component
 * - Component update scheduling when state changes
 * - A subscription system for state change notifications
 * 
 * @extends ReactClone
 */
export class StateManager extends ReactClone {
  /**
   * An array of listeners for the useState hook.
   */
  private static listeners: Function[] = [];

  /**
   * Creates a custom useState hook.
   * @returns A function that takes an initialValue and returns an array with the current state value and a function to update the state.
   */
  public static createUseState(): (
    initialValue: any
  ) => [any, (newValue: any) => void] {
    return (initialValue: any) => {
      const [state, setState] = this.getState(initialValue);
      const index = this.currentComponentId;
      return [state, (newValue: any) => setState(index, newValue)];
    };
  }

  /**
   * Retrieves the state value and a function to update it.
   * If the state value does not exist, it initializes it with the provided initial value.
   *
   * @param initialValue - The initial value of the state.
   * @returns A tuple containing the state value and a function to update it.
   */
  private static getState(
    initialValue: any
  ): [any, (index: any, newValue: any) => void] {
    const uniqueId = `${this.currentComponentId}:${this.currentHookIndex}`;
    this.currentHookIndex++; // Incrementa después de usar para asegurar que el próximo hook tenga un índice único.

    if (!this.globalState.has(uniqueId)) {
      this.globalState.set(uniqueId, initialValue);
    }

    const setState = (index: number, newValue: any) => {      
      // Si el valor del estado ha cambiado, actualiza globalState y añade el componente al conjunto de actualizaciones.            
      let currentState = this.globalState.get(uniqueId);
      if (currentState !== newValue) {        
        this.globalState.set(uniqueId, newValue);        
        this.componentsToUpdate.add(index); // Suponiendo que index es el id del componente.        
        this.scheduleRender();
        this.resetCurrentHookIndex(); // Podría ser necesario ajustar cómo se invoca la renderización.
      }
    };

    return [this.globalState.get(uniqueId), setState];
  }
  
  // Asegúrate de resetear 'currentHookIndex' al inicio del renderizado de cada componente.
  static resetCurrentHookIndex() {
    this.currentHookIndex = 0;
  }
  /**
   * Subscribes a listener function to the state.
   * @param {Function} listener - The listener function to be subscribed.
   */
  public static subscribe(listener: Function) {
    this.listeners.push(listener);
  }

  /**
   * Unsubscribes a listener from the state.
   * @param {Function} listener - The listener function to unsubscribe.
   */
  public static unsubscribe(listener: Function) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }
}
