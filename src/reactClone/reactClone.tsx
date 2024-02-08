import {
  ElementType,
  Props,
  ReactClonElement,
  FunctionComponent,
} from "../types&Interface/TIndex";

export class ReactClone {
  private static component: ReactClonElement | null = null;
  private static rootContainer: HTMLElement | null = null;
  private static isStateUpdated: boolean = false;
  public static currentComponentId: number | any = null;
  private static componentMap = new Map<string, ReactClonElement>();
  static componentsToUpdate = new Set();

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
  private static generateUniqueId(type: ElementType): string {
    const randomPart = Math.random().toString(36).substring(2, 15);
    const timePart = new Date().getTime().toString(36);
    return `${type}_${randomPart}_${timePart}`;
  }

  static render(element: ReactClonElement, container: HTMLElement | any) {
    this.component = element;
    this.rootContainer = container;
    this.isStateUpdated = true;
    this.updateDom();
  }

  static updateDom(): void {
    this.isStateUpdated = false;
    if (!this.rootContainer || !this.component) {
      return;
    }
     if (!this.isStateUpdated) {
       // Fase de inicialización: renderiza todo el árbol por primera vez
       while (this.rootContainer.firstChild) {
         this.rootContainer.removeChild(this.rootContainer.firstChild);
       }

       const renderedTree = this.buildComponentTree(this.component);
       this.rootContainer.appendChild(renderedTree);
       this.isStateUpdated = true; // Marca que el DOM inicial ha sido renderizado
     }        

    console.log("processComponentsWithForEach llamado");
    console.log(`Número de componentes en el mapa: ${this.componentMap.size}`);
    
    // elementos raiz
    this.componentMap.forEach((component, key) => {
      console.log(`Component ID: ${key}`, component);
      // Aquí puedes procesar cada componente
    });
  }
  /**
   * Builds the component tree recursively.
   * @param node
   */
  static buildComponentTree(node: ReactClonElement): HTMLElement | Text {
    this.componentMap.set(node.id, node);
    this.currentComponentId = node.id;
    // type
    if (typeof node.type === "function") {
      const result = node.type(node.props);
      return this.buildComponentTree(result);
    }

    const element = document.createElement(node.type);
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
    return element;
  }

  static scheduleRender(componentId: any): void {
    // Lógica para marcar el componente para rerenderizado
    // Esto podría ser simplemente añadir el ID del componente a un conjunto de componentes que necesitan actualización
    this.componentsToUpdate.add(componentId);
    console.log("scheduleRender llamado", this.componentsToUpdate);

    if (!this.isStateUpdated) {
      window?.requestAnimationFrame(() => this.updateDom());
      this.isStateUpdated = true;
    }
  }

  static setStateUpdated(): void {
    this.isStateUpdated = false;
  }
}
