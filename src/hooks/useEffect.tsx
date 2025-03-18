import { ReactClone } from '../reactClone/reactClone';
/**
 * A utility class that provides an implementation similar to React's useEffect hook.
 * 
 * This class manages side effects in a component-like structure by tracking effects,
 * their dependencies, and cleanup functions. Effects are only re-run when their
 * dependencies change, mimicking React's useEffect behavior.
 * 
 * @example
 * ```tsx
 * // Inside a component rendering function
 * UseEffect.createEffect(() => {
 *   console.log('Effect ran');
 *   return () => console.log('Cleanup ran');
 * }, [someDependency]);
 * 
 * // After all components have rendered
 * UseEffect.runEffects();
 * ```
 * 
 * @remarks
 * This is part of a custom React-like implementation and is not meant to be used
 * with the official React library.
 */
export default class UseEffect extends ReactClone  {  
  public static effects: any[] = [];
  public static cleanupFunctions: any[] = [];
  public static dependencies: any[] = [];
  public static currentEffectIndex: number = 0;
  public static currentEffectDependencies: any[] = [];


  /**
   * Reinicia el índice de efecto y sus dependencias asociadas.
   * Debe invocarse al inicio de cada render para resolver el orden correcto de los efectos.
   */
  public static resetCurrentEffectIndex(): void {
    this.currentEffectIndex = 0;    
  }
  /**
   * Crea y/o actualiza un efecto similar a useEffect.
   * Se guarda el callback y las dependencias y se ejecuta el callback si es la primera vez
   * o si las dependencias han cambiado.
   * 
   * @param callback - La función a ejecutar como efecto.
   * @param dependencies - Array de dependencias para determinar si se debe re-ejecutar el efecto.
   */
  public static createEffect(callback: Function, dependencies: any[]): void {
    const index = this.currentEffectIndex;
    // Si es la primera vez que se registra el efecto.
    if (!this.currentEffectDependencies[index]) {
      this.effects.push(callback);
      this.dependencies.push(dependencies);
      // Guarda las dependencias de la primera ejecución.
      this.currentEffectDependencies[index] = dependencies;
      console.log(`Ejecutando efecto inicial ${index}`);
      const result = callback();
      console.log("Resultado del callback:", result);
      if (result && typeof result === "object" && result.id) {
        const tree = ReactClone.buildComponentTree(result);
        console.log("Árbol de componente construido desde el efecto:", tree);
      }
      if (typeof result === "function") {
        this.cleanupFunctions[index] = result;
      }
    } else {
      // Si ya se registró anteriormente, se verifica si las dependencias cambiaron.
      const oldDeps = this.currentEffectDependencies[index];
      const changed = dependencies.some((dep, i) => !Object.is(dep, oldDeps[i]));
      if (changed) {
        // Ejecuta la función de limpieza si existe.
        if (this.cleanupFunctions[index]) {
          this.cleanupFunctions[index]();
        }
        // Actualiza las dependencias y re-ejecuta el callback.
        console.log(`Ejecutando efecto actualizado ${index}`);
        this.currentEffectDependencies[index] = dependencies;
        const result = callback();
        console.log("Resultado del callback:", result);
        if (result && typeof result === "object" && result.id) {
          const tree = ReactClone.buildComponentTree(result);
          console.log("Árbol de componente construido desde el efecto:", tree);
        }
        if (typeof result === "function") {
          this.cleanupFunctions[index] = result;
        }
      }
    }    
    this.currentEffectIndex++;
  }

   /**
   * Realiza el procesamiento de cada efecto.
   * Ejecuta el callback, pasa lo retornado a través de ReactClone.buildComponentTree
   * y, en caso de que retorne una función de limpieza, la almacena.
   */
   public static runEffects(): void {
    this.effects.forEach((callback, index) => {
      console.log(`Ejecutando efecto (runEffects) ${index}`);
      const result = callback();
      console.log("Resultado del callback:", result);
      if (result && typeof result === "object" && result.id) {
        const tree = ReactClone.buildComponentTree(result);
        console.log("Árbol de componente construido desde runEffects:", tree);
      }
      if (typeof result === "function") {
        this.cleanupFunctions[index] = result;
      }
    });
  }

}
