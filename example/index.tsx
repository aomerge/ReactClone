/**@jsx ReactClon */
import ReactClone, {  
  globalState,  
  abs,
  abs2
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

  const [stat, setState] = abs("valor inicial");


  // JSX que se renderiza en el DOM
  return (
    <div>      
      <p>{stat}</p>      
      <button
        onClick={() => {
          console.log("sd", stat);
          setState("goku");                 
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
