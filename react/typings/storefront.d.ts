// eslint-disable-next-line no-unused-vars
import { FunctionComponent } from "react";

declare global {
  interface StorefrontFunctionComponent<P = {}> extends FunctionComponent<P> {
    [x: string]: any;
    getSchema?(props: P): object;
    schema?: object;
  }

  interface StorefrontComponent<P = {}, S = {}> extends Component<P, S> {
    getSchema?(props: P): object;
    schema: object;
  }
}

type GenericObject = Record<string, any>;

declare global {
  interface StoreFrontFC<P = GenericObject> extends FunctionComponent<P> {
    getSchema?(props: P): GenericObject;
    schema?: GenericObject;
  }
}
