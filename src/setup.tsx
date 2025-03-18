import { StateManager } from "./hooks/useState";
import { ReactClone } from "./reactClone/reactClone";
import UseEffect from "./hooks/useEffect";
type StateTuple = [any, (newValue: any) => any];

export const useState = StateManager.createUseState();
export const globalState = StateManager.globalState;
UseEffect.resetCurrentEffectIndex();
export const useEffect = UseEffect.createEffect.bind(UseEffect);

export default ReactClone;
