import React, { createContext, useReducer } from "react";

// Types
type CartItem = {
    quantity: any; id: number; title: string; image: string;
};

type State = {
  cart: CartItem[] | null;
  loading: boolean;
};

type CartAction = {
  type: "getcart";
  payload: CartItem[] | null;
};

type LoadAction = {
  type: "setloading";
  payload: boolean;
};

type Action = CartAction | LoadAction;

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
      return { ...state, cart: action.payload, loading: false };
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
