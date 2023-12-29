import StateManager from "./useState";

describe("StateManager", () => {
  let stateManager: StateManager;

  beforeEach(() => {
    stateManager = new StateManager();
  });

  it("should create a new useState hook", () => {
    const useState = stateManager.createUseState();

    expect(typeof useState).toBe("function");
  });

  it("should return initial value and setState function", () => {
    const useState = stateManager.createUseState();
    const [value, setValue] = useState("initial");

    expect(value).toBe("initial");
    expect(typeof setValue).toBe("function");
  });

  it("should update the state when setState is called", () => {
    const useState = stateManager.createUseState();
    const [value, setValue] = useState("initial");

    setValue("updated");

    expect(value).toBe("updated");
  });

  it("should maintain separate state for different useState hooks", () => {
    const useState1 = stateManager.createUseState();
    const useState2 = stateManager.createUseState();

    const [value1, setValue1] = useState1("initial1");
    const [value2, setValue2] = useState2("initial2");

    setValue1("updated1");
    setValue2("updated2");

    expect(value1).toBe("updated1");
    expect(value2).toBe("updated2");
  });
});
