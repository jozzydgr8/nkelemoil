import React, { createContext, useReducer } from "react";
import { CartItem } from "../shared/Types";

// Types


type State = {
  cart: CartItem[] | null;
  loading: boolean;
};

type marketAction = {
  type: "getcart";
  payload: CartItem[] | null;
};

type LoadAction = {
  type: "setloading";
  payload: boolean;
};

type Action = marketAction | LoadAction;

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
