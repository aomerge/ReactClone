export default class StateManager {
  private globalState: { [key: number]: any };
  private currentIndex: number;

  constructor() {
    this.globalState = [];
    this.currentIndex = 0;
  }

  public createUseState() {
    const callIndex = this.currentIndex;
    this.currentIndex++;
    console.log("callIndex", callIndex);
    console.log("this.globalState.hasOwnProperty(callIndex)", this.globalState.hasOwnProperty(callIndex));      
    
    return (initialValue: any) => this.getState(callIndex, initialValue);
  }

  private getState(callIndex: number, initialValue: any) {
    console.log("callIndex", callIndex);
    console.log("this.globalState", this.globalState);
    
    if (!this.globalState.hasOwnProperty(callIndex)) {
      this.globalState[callIndex] = initialValue;
    }
    console.log("callIndex", callIndex);
    console.log("this.globalState", this.globalState);

    // Devuelve el estado actual y una función para actualizarlo
    console.log("AAAAAAAAAA", [
      this.globalState[callIndex],
      (newValue: any) => this.setState(callIndex, newValue)]);

    return [this.globalState[callIndex], (newValue: any) => this.setState(callIndex, newValue)];
  }

  private setState(callIndex: number, newValue: any) {    
    console.log(newValue);
    this.globalState[callIndex] = newValue;
    // Aquí deberías desencadenar el re-renderizado del componente
  }
}

/*
// Uso de la clase StateManager y su método createUseState
const stateManager = new StateManager();
const useState = stateManager.createUseState();
console.log("useState", useState);
const [myState, setMyState] = useState("initial value"); */
