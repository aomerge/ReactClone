import {
  ElementType,
  Props,
  ReactClonElement,
  FunctionComponent,
} from "../types&Interface/TIndex";

/**
 * A simplified implementation of React's core functionality.
 * 
 * ReactClone provides mechanisms for creating, rendering, and updating UI components
 * in a virtual DOM-like manner. It supports functional components, props, children,
 * and state management through a useState hook implementation.
 * 
 * Features:
 * - Virtual DOM representation with element creation and rendering
 * - Component state management
 * - Efficient DOM updates with selective re-rendering
 * - Support for component props and event handling
 * - Functional component support
 * 
 * @example
 * const App = () => ReactClone.createElement('div', {className: 'app'}, 
 *   ReactClone.createElement('h1', {}, 'Hello ReactClone')
 * );
 * 
 * ReactClone.render(App(), document.getElementById('root'));
 */
export class ReactClone {
  /**
   * Represents the global state for the useState hook.
   */
  static globalState: any = new Map<number, any>();
  /**
   * The component property of the ReactClone class.
   * @type {ReactClonElement | null}
   * @private
   */
  private static component: ReactClonElement | null = null;
  /**
   * The root container element for the React Clone application.j
   * @type {HTMLElement | null}
   */
  private static rootContainer: HTMLElement | null = null;
  /**
   * Indicates whether the state has been updated.
   */
  private static isStateUpdated: boolean = false;
  /**
   * The ID of the current component.
   */
  public static currentComponentId: number | any = null;
  /**
   * Map that stores the component elements in ReactClone.
   */
  private static componentMap = new Map<string, ReactClonElement>();
  /**
   * Set of components to update.
   */
  static componentsToUpdate = new Set();
  /**
   * Represents the current index of the hook.
   */
  static currentHookIndex = 0;

  // Dentro de tu clase ReactClone
  static functionalComponentMap = new Map<number, HTMLElement | Text>();

  /**
   * Creates a ReactClonElement with the specified type, props, and children.
   * @param type - The type of the element.
   * @param props - The props of the element.
   * @param children - The children elements of the element.
   * @returns The created ReactClonElement.
   */
  static createElement(
    type: ElementType,
    props: Props,
    ...children: ReactClonElement[]
  ): ReactClonElement {
    const id = this.generateUniqueId(type);
    return {
      id,
      type,
      props,
      children,
    };
  }

  /**
   * Generates a unique ID based on the provided element type.
   * @param type - The element type.
   * @returns The generated unique ID.
   */
  private static generateUniqueId(type: ElementType): string {
    const randomPart = Math.random().toString(36).substring(2, 15);
    const timePart = new Date().getTime().toString(36);
    return `${type}_${randomPart}_${timePart}`;
  }

  /**
   * Renders a ReactClonElement into a container.
   * @param element - The ReactClonElement to render.
   * @param container - The container element to render the element into.
   */
  static render(element: ReactClonElement, container: HTMLElement | any) {
    this.component = element;
    this.rootContainer = container;
    this.updateDom();
  }

  /**
   * Updates the DOM with the latest state of the component.
   * If the root container and component are not defined, the function returns early.
   * If the state has not been updated, it initializes the rendering process by removing all existing child nodes from the root container,
   * builds the component tree, appends it to the root container, and marks the initial DOM rendering as complete.
   * Finally, it logs information about the number of components in the component map and processes each component individually.
   */
  static updateDom(): void {    
    if (!this.rootContainer) {
      console.warn("No se ha definido rootContainer.");
      return;
    }
    // Asumimos que el componente raíz siempre necesita ser renderizado inicialmente.
    if (!this.isStateUpdated) {
      // Proceso de renderizado inicial
      while (this.rootContainer.firstChild) {
        this.rootContainer.removeChild(this.rootContainer.firstChild);
      }
      const renderedTree = this.buildComponentTree(
        this.component as ReactClonElement
      );
      this.rootContainer.appendChild(renderedTree);
      this.isStateUpdated = true;
    } else {
      // Proceso de actualización
      this.componentsToUpdate.forEach((componentId) => {
        const component = this.componentMap.get(componentId as string);        
        if (component) {
          let existingElement: any;
          if (component.type instanceof Function) {
            existingElement = this.functionalComponentMap.get(
              componentId as number
            );            
          } else {
            existingElement = this.rootContainer?.querySelector(
              `[data-react-clon-id="${componentId}"]`
            );
          }
          if (existingElement) {
            // Genera el nuevo contenido del componente y reemplaza el existente en el DOM.
            const newContent = this.buildComponentTree(component);
            existingElement.replaceWith(newContent);
          } else {
            console.warn(
              `Elemento con ID ${componentId} no encontrado para actualización.`
            );
          }
        }
      });
      this.componentsToUpdate.clear(); // Limpiar después de procesar las actualizaciones.
    }
  }

  /**
   * Builds the component tree recursively.
   * @param node - The node to build the component tree from.
   * @returns The built component tree.
   */
  static buildComponentTree(node: ReactClonElement): HTMLElement | Text {
    this.componentMap.set(node.id, node);
    this.currentComponentId = node.id;

    let element: any | HTMLElement | Text | null = null;
    // type
    if (typeof node.type === "function") {
      const componentOutput = node.type(node.props);
      element = this.buildComponentTree(componentOutput); // Recursivamente construye el árbol para la salida.
      this.functionalComponentMap.set(node.id, element); // Asocia el resultado con el ID del componente.
    } else {
      element = document.createElement(node.type);
      element.dataset.reactClonId = node.id;
      // Configuración de propiedades y eventos
      if (node.props) {
        Object.keys(node.props).map((key) => {
          if (key.startsWith("on")) {
            const eventType = key.substring(2).toLowerCase();
            element.addEventListener(eventType, node.props[key]);
          }
          element.setAttribute(key, node.props[key]);
        });
      }
      // className
      if (node.props && node.props.className) {
        element.setAttribute("class", node.props.className);
      }

      // rederizado de los elementos cambiantes

      if (Array.isArray(node.children)) {
        node.children.forEach((child: any | any[]) => {
          /* console.log("child",child); */
          if (typeof child === "string") {
            return element.appendChild(
              document.createTextNode(node.children.join(""))
            );
          }
          return element.appendChild(this.buildComponentTree(child));
        });
        return element;
      }
    }
    return element;
  }

  /**
   * Marks the component with the specified ID for re-rendering.
   * @param componentId - The ID of the component to be re-rendered.
   */
  static scheduleRender(): void {
    if (typeof window !== "undefined") {      
      window.requestAnimationFrame(() => this.updateDom());
    }
  }

  /**
   * Sets the state update flag to false.
   */
  static setStateUpdated(): void {
    this.isStateUpdated = false;
  }

  
}
