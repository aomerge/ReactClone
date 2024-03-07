import { StateManager } from "./hooks/useState";
import { ReactClone } from "./reactClone/reactClone";
type StateTuple = [any, (newValue: any) => any];

export const abs = StateManager.createUseState();
export const globalState = StateManager.globalState;

export default ReactClone;
