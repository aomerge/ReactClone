import { ReactClone } from "../reactClone/reactClone";

type StateTuple = [any, (newValue: any) => any];


export class StateManager extends ReactClone {
  static globalState: any = new Map<number, any>();  
  private static listeners: Function[] = [];

  public static createUseState(): (
    initialValue: any
  ) => [any, (newValue: any) => void] {
    return (initialValue: any) => this.getState(initialValue);
  }
  
  private static getState(
    initialValue: any
    ): [any, (newValue: any) => void] {
      const index = this.currentComponentId;
      console.log("index x", index);
      
      if (!this.globalState.has(index)) {
        this.globalState.set(index, initialValue);
    }

    
    const setState = (newValue: any) => {
      console.log("newvalue", newValue);
      if (this.globalState.get(index) !== newValue) {
        this.setStateUpdated();
        this.globalState.set(index, newValue);
        this.scheduleRender(index);
        this.listeners.forEach((listener) => listener());
      }
      if (!this.globalState.has(index)) {
        console.warn("No se puede actualizar el estado");
      }
    };
    const TgetState = this.globalState.get(index);

    return [TgetState, setState];
  }

  public static subscribe(listener: Function) {
    this.listeners.push(listener);
  }

  private static componentStates = new Map();

  public static useState(componentId: string, initialValue: any): [any, (newValue: any) => void] {

    if (!this.componentStates.has(componentId)) {
      this.componentStates.set(componentId, new Map());
    }
    const stateMap = this.componentStates.get(componentId);
    const index = stateMap.size;
    stateMap.set(index, initialValue);

    const setState = (newValue: any) => {
      stateMap.set(index, newValue);
      ReactClone.scheduleRender(componentId);
    };
    return [stateMap.get(index), setState];
  }

  // Método para eliminar suscriptores si es necesario
  public static unsubscribe(listener: Function) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }
}


/* console.log("stateValue tzlh", stateValue2);
setState2(100);
console.log("stateValue tzl", stateValue2); */

// Suscribirse a cambios
StateManager.subscribe(() =>
  console.log("Estado cambiado:", StateManager.globalState)
);

console.log("globalstate", StateManager.globalState);
