let globalState = {}; // Estado global para mantener los valores del estado
let currentIndex = 0; // Índice para llevar un seguimiento de la llamada actual a useState

export default function createUseState() {
  let callIndex = currentIndex; // Capturar el índice actual
  currentIndex++;

  return function useState(initialValue: any) {
    // Inicializar el estado si es la primera llamada
    if (!globalState.hasOwnProperty(callIndex)) {
      globalState[callIndex] = initialValue;
    }

    function setState(newValue: () => {}) {
      globalState[callIndex] = newValue;

      // Aquí, deberías desencadenar el re-renderizado del componente.
      // En React, esto se maneja internamente.
    }

    return [globalState[callIndex], setState];
  };
}

// Uso
const useState = createUseState();

function MyComponent() {
  const [count, setCount] = useState(0);

  // Usa count y setCount como lo harías en React...
}
