import { Outlet, RouterProvider } from "react-router";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import HomePage from './Pages/HomePage'
import Layout from "./Layout";
import { Idlayout } from "./Pages/IdLayout";
import { Cart } from "./Pages/Cart";

import { CheckoutSteps } from "./Pages/Component/CheckoutSteps";
import { useEffect } from "react";
import { palmOilProducts } from "./data";
import { UseContextData } from "./Context/UseContextData";


function App() {
const {dispatch,loading,cart} = UseContextData();
useEffect(() => {
  const updateCartFromStorage = () => {
    dispatch({ type: 'setloading', payload: true });

    const items = JSON.parse(localStorage.getItem("myItems") || "[]");

    const data = palmOilProducts
      .filter((product) =>
        items.some((i: any) => String(product.id) === i.id)
      )
      .map((product) => {
        const matchedItem = items.find((i: any) => String(product.id) === i.id);
        return {
          ...product,
          quantity: matchedItem?.quantity || 1,
        };
      });

    dispatch({ type: 'getcart', payload: data });
  };

  updateCartFromStorage(); // run on first load

  // Listen to custom event when cart is updated
  window.addEventListener("cartUpdated", updateCartFromStorage);

  return () => {
    window.removeEventListener("cartUpdated", updateCartFromStorage);
  };
}, []);


if(loading){
  return <>...loading</>
}
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/nkelemoil" element={<Layout/>}>
      <Route index element={<HomePage/>}/>
      <Route path=":id" element={<Idlayout/>} />
      <Route path='cart' element={<Outlet/>}>
      <Route index element={<Cart/>} />
      <Route path="checkout" element={<CheckoutSteps/>}/>
      </Route>
      
    </Route>
  ))
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;