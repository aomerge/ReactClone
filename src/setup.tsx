import {
  ElementType,
  Props,
  ReactClonElement,
  FunctionComponent,
} from "./types&Interface/TIndex";
import createUseState from "./hooks/useState";
//import createUseEffect from "./hooks/useEffect";

export const useState = createUseState();
//export const useEffect = createUseEffect();

class ReactClone {
  static render(element: ReactClonElement, container: HTMLElement | any) {
    container?.appendChild(this.run(element));
  }

  private static run(node: any): ReactClonElement {
    if (typeof node.type === "function") {
      const result = node.type(node.props);
      return this.run(result);
    }
    const element = document.createElement(node.type);
    if (node.props) {
      Object.keys(node.props).map((key) => {
        if (key.startsWith("on")) {
          const eventType = key.substring(2).toLowerCase();
          element.addEventListener(eventType, node.props[key]);
        }
        element.setAttribute(key, node.props[key]);
      });
    }
    if (node.props && node.props.className) {
      element.setAttribute("class", node.props.className);
    }
    node.children.forEach((child: any) => {
      if (typeof child === "string") {
        return element.appendChild(document.createTextNode(node.children));
      }
      return element.appendChild(this.run(child));
    });
    return element;
  }
}

export default ReactClone;
