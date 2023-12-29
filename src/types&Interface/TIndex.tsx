export type ElementType = string | FunctionComponent;
export type Props = { [key: string]: any } & { children?: ReactClonElement[] };
export type ReactClonElement = {
  type: ElementType;
  props: Props;
  children: ReactClonElement[] | string[];
};
export interface FunctionComponent {
  (props: Props): ReactClonElement;
}
