import { StateManager } from "../../hooks/useState";

describe("StateManager", () => {

  it("should create and return a useState function", () => {
    const useState = StateManager.createUseState();
    expect(typeof useState).toBe("function");

    const [state, setState] = useState("initial value");
    expect(state).toBe("initial value");
    expect(typeof setState).toBe("function");
  });

  it("should update the state and trigger listeners when setState is called", () => {
    const useState = StateManager.createUseState();
    const [state, setState] = useState("initial value");

    const listener = jest.fn();
    StateManager.subscribe(listener);

    setState("new value");

    expect(state).toBe("new value");
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("should return the same state and setState function for the same componentId", () => {
    const componentId = "component1";
    const [state1, setState1] = StateManager.useState(componentId, "initial value");
    const [state2, setState2] = StateManager.useState(componentId, "initial value");

    expect(state1).toBe(state2);
    expect(setState1).toBe(setState2);
  });

  it("should update the state for a specific componentId when setState is called", () => {
    const componentId1 = "component1";
    const componentId2 = "component2";

    const [state1, setState1] = StateManager.useState(componentId1, "initial value");
    const [state2, setState2] = StateManager.useState(componentId2, "initial value");

    setState1("new value 1");
    setState2("new value 2");

    expect(state1).toBe("new value 1");
    expect(state2).toBe("new value 2");
  });

  it("should unsubscribe a listener when unsubscribe is called", () => {
    const listener1 = jest.fn();
    const listener2 = jest.fn();

    StateManager.subscribe(listener1);
    StateManager.subscribe(listener2);

    StateManager.unsubscribe(listener1);

    const useState = StateManager.createUseState();
    const [state, setState] = useState("initial value");

    setState("new value");

    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).toHaveBeenCalledTimes(1);
  });
});