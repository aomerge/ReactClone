/**@jsx ReactClon */
import ReactClone, { useState } from "../src/ReactClon";
import "./styles.css";
function Buttom({ setIndex }: { setIndex: any }) {
  return <button onClick={() => setIndex(2)}>Haz clic aquí</button>;
}
function ReactClon(type: any, props: any, ...args: any[]) {
  const children = [].concat(...args);
  return {
    type,
    props,
    children,
  };
}
const Subtitle = ({ text }: { text: string | null }) => {
  const [index, setIndex] = useState(0);
  console.log(index);
  return (
    <div>
      <h1 className="text">hola bebe</h1>
      <Alt />
      <h2>{text}</h2>
      <Buttom setIndex={setIndex} />
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
