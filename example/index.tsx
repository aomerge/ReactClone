/**@jsx ReactClon */
import ReactClone, {  
  globalState,  
  abs,

} from "../src/setup";
import "./styles.css";
function ReactClon(type: any, props: any, ...args: any[]) {
  const children = [].concat(...args);
  return {
    id: Math.floor(Math.random() * 10000),
    type,
    props,
    children,
  };
}

function Test() {

  const [stat, setState] = abs("valor");
  const [stat2, setState2] = abs("valor2");


  // JSX que se renderiza en el DOM
  return (
    <div>      
      <p>{stat}</p>      
      <p>{stat2}</p>      
      <button
        onClick={() => {
          setState("goku");
          setState2("vegeta");
          console.log("state hook", stat);                           
        }}
      >
        Cambiar estado
      </button>      
    </div>
  );
}
const Subtitle = ({ text }: { text: string | null }) => {
  return (
    <div>
      <h1 className="text">hola mundo soy un clon de react</h1>      
      <Test />      
    </div>
  );
};

ReactClone.render(<Subtitle text="hola" />, document.querySelector("#app"));
