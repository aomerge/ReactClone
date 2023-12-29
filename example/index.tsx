/**@jsx ReactClon */
import ReactClone, {useState} from "../src/setup";
import "./styles.css";
function Buttom({ setIndex }: { setIndex: any }) {
  return <button onClick={() => alert("hola mundo")}>Haz clic aquí</button>;
}
function ReactClon(type: any, props: any, ...args: any[]) {
  const children = [].concat(...args);
  return {
    type,
    props,
    children,
  };
}
function Test() {
  // Inicialización del estado con useState
  const [text, setText] =  useState("holag");   

  // Función para actualizar el estado
  const changeText = () => {
    setText("adios");
    console.log("text",text);
  };

  // JSX que se renderiza en el DOM
  return (
    <div>
      <p>{text}</p> {/* Muestra el estado actual */}
      <button onClick={changeText}>Cambiar Texto</button>{" "}      
    </div>
  );
}
const Subtitle = ({ text }: { text: string | null }) => {  
  
  return (
    <div>
      <h1 className="text">hola bebe</h1>
      <Alt />
      <h2>{text}</h2>
      <Test />
      <Buttom setIndex={""} />
    </div>
  );
};
const Alt = () => {
  return (
    <ul>
      <li>hola</li>
      <li>hola</li>
    </ul>
  );
};

ReactClone.render(<Subtitle text="hola" />, document.querySelector("#app"));
