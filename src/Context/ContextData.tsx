import React, { createContext, useReducer } from "react";
import { CartItem, OrderItem, productType, userDataType } from "../shared/Types";

// Types


type State = {
  cart: CartItem[] | null;
  loading: boolean;
  order:OrderItem[] | null;
  product:productType[] | null;
  user:userDataType[] |null
};

type marketAction = {
  type: "getcart";
  payload: CartItem[] | null;
};
type userAction = {
  type:'getUserData';
  payload: userDataType[] | null
}

type LoadAction = {
  type: "setloading";
  payload: boolean;
};

type orderAction = {
  type:'getOrder',
  payload: OrderItem[] | null
}
type productAction = {
  type:'getProducts',
  payload: productType[] | null
}
type Action = marketAction | LoadAction | orderAction | productAction | userAction;

type ContextProps = State & {
  dispatch: React.Dispatch<Action>;
};

type ComponentProps = {
  children: React.ReactNode;
};

// Initial State
const initialState: State = {
  cart: null,
  loading: false,
  order:null,
  product: null,
  user:null,
};

// Create Context with default value
export const Context = createContext<ContextProps>({
  ...initialState,
  dispatch: () => null, // dummy dispatch for default
});

// Reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "getcart":
      return { ...state, cart: action.payload };
    case "setloading":
      return { ...state, loading: action.payload };
    case "getOrder":
      return {...state, order: action.payload};
    case "getProducts":
      return {...state, product: action.payload};
    case "getUserData":
      return {...state, user:action.payload}
    default:
      return state;
  }
};

// Provider
export const ContextData = ({ children }: ComponentProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  );
};
