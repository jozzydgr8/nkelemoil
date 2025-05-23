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
import AdminLayout from "./Admin/AdminLayout";
import { Admin } from "./Admin/Page.tsx/Admin";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCYEeE-N22ytQWInLLo9_w8jQPVSliKr0",
  authDomain: "commercetemp-68d9d.firebaseapp.com",
  projectId: "commercetemp-68d9d",
  storageBucket: "commercetemp-68d9d.appspot.com",
  messagingSenderId: "809173166381",
  appId: "1:809173166381:web:ae520ef4ed6cc9701b8ba4"
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



//useeffect to fetch orders
useEffect(() => {
  dispatch({ type: 'setloading', payload: true });
  if(!user){
    dispatch({ type: 'setloading', payload: false });
    return
  }
  const unSubscribe = onSnapshot(donorRef, (snapshot) => {
    const data: donorType[] = snapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        name: docData.name,
        amount: docData.amount,
        method: docData.method,
        status: docData.status,
        date: docData.date,
        message: docData.message,
        email: docData.email,
        currency:docData.currency
      };
    });

    dispatch({ type: 'getDonors', payload: data });
    console.log(data);
    dispatch({ type: 'loading', payload: false });
  }, (error) => {
    console.error('Error fetching data:', error);
    dispatch({ type: 'loading', payload: false });
  });

  return () => unSubscribe();
}, [user]);

if(loading ||userloading){
  return <Loading/>
}
  const router = createBrowserRouter(createRoutesFromElements(
    <>
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

    <Route path="/admin" element={<AdminLayout/>}>
      <Route index element={<Admin/>}/>
      <Route path="adminsession" element={<Session/>}/>
      it
    </Route>
    </>
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