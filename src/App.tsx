import { Navigate, Outlet, RouterProvider } from "react-router";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import HomePage from './Pages/HomePage'
import Layout from "./Layout";
import { Idlayout } from "./Pages/IdLayout";
import { Cart } from "./Pages/Cart";

import { CheckoutSteps } from "./Pages/Component/CheckoutSteps";
import { useEffect } from "react";
import { palmOilProducts } from "./data";
import { UseContextData } from "./Context/UseContextData";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Loading } from "./shared/Loading";
import { UseAuthContext } from "./Context/UseAuthContext";
import Session from "./Pages/Session";
import SignUp from "./Pages/SignUp";
import { ProtectedRoutes } from "./shared/ProtectedRoutes";
import { GuestRoutes } from "./shared/GuestRoutes";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkadbzWyKrB81D8SEbFpxWP3r3bRbJsAA",
  authDomain: "nkelemoil.firebaseapp.com",
  projectId: "nkelemoil",
  storageBucket: "nkelemoil.firebasestorage.app",
  messagingSenderId: "284682857488",
  appId: "1:284682857488:web:3126cd858f234493fcee95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);




function App() {

//  user use effect 

const {dispatch,loading,cart} = UseContextData();
const {user, dispatch:transmit, loading:userloading} = UseAuthContext();




// useeffect ti handle cart

useEffect(() => {
  console.log(palmOilProducts)
  dispatch({ type: 'setloading', payload: true });
  const updateCartFromStorage = () => {

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
    dispatch({type:'setloading', payload:false});
  };

  updateCartFromStorage(); // run on first load

  // Listen to custom event when cart is updated
  window.addEventListener("cartUpdated", updateCartFromStorage);

  return () => {
    window.removeEventListener("cartUpdated", updateCartFromStorage);
  };
}, []);

//use efffeevt for user
  useEffect(()=>{
    transmit({type:'loading', payload:true});
    const unSubscribe = onAuthStateChanged(auth, user=>{
      if(user){
        transmit({type:'getUser', payload:user});
        console.log('signed in', user);
        transmit({type:'loading', payload:false});
      }else{
        transmit({type:'getUser', payload:null});
        console.log('logged out')
        transmit({type:'loading', payload:false});
      }
    });
    return ()=>unSubscribe()
  },[]);
console.log("Current user in component:", user);





if(loading ||userloading){
  return <Loading/>
}
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/nkelemoil" element={<Layout/>}>
      <Route index element={<HomePage/>}/>
      <Route path=":id" element={<Idlayout/>} />
      <Route path='cart' element={<Outlet/>}>
      <Route index element={<Cart/>} />
      <Route path="checkout" element={<ProtectedRoutes user={user}><CheckoutSteps/></ProtectedRoutes>}/>
      
      </Route>
      <Route path='user' element={<GuestRoutes user={user}><Session/></GuestRoutes>}/>
    <Route path='signup' element ={<GuestRoutes user={user}><SignUp/></GuestRoutes>} />
      
    </Route>
  ))
  return (
    <div className="App">
      <RouterProvider router={router}/>
      <ToastContainer 
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light" // or "dark"
    />
    </div>
  );
}

export default App;