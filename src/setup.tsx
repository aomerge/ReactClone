import { StateManager } from "./hooks/useState";
import { ReactClone } from "./reactClone/reactClone";
type StateTuple = [any, (newValue: any) => any];

export const abs = StateManager.createUseState();

/* export function createMultipleUseStates(initialValues: any | any[]): any {
  const isSingleValue = !Array.isArray(initialValues);
  const values = isSingleValue ? [initialValues] : initialValues;

  const states = values.map((initialValue) => {
    // Asegurarse de que cada useStateInstance cree un estado independiente
    const useStateInstance = StateManager.createUseState();
    return useStateInstance(initialValue);
  });

  // Devolver un único estado o un arreglo de estados, según corresponda
  return isSingleValue ? states[0] : states;
}

export function useCustomState(initialValue: any) {
  const useStateInstance = StateManager.createUseState();
  return useStateInstance(initialValue);
} */


export const globalState = StateManager.globalState;


export default ReactClone;
