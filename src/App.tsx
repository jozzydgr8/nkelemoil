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
import {collection, getFirestore, onSnapshot} from "firebase/firestore";
import { Loading } from "./shared/Loading";
import { UseAuthContext } from "./Context/UseAuthContext";
import Session from "./Pages/Session";
import SignUp from "./Pages/SignUp";
import { ProtectedRoutes, AdminProtectedRoutes } from "./shared/ProtectedRoutes";
import { GuestRoutes, AdminGuestRoutes } from "./shared/GuestRoutes";
import AdminLayout from "./Admin/AdminLayout";
import { Admin } from "./Admin/Page.tsx/Admin";
import { OrderItem, productType, userDataType } from "./shared/Types";
import { getStorage } from "firebase/storage";
import { AdminUpload } from "./Admin/Page.tsx/AdminUpload";

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
export const db = getFirestore();
export const productRef = collection(db, 'product');
export const orderRef = collection(db, 'order');
export const userRef = collection(db, 'user')
export const storage = getStorage(app);




function App() {

//  user use effect 

const {dispatch,loading,product} = UseContextData();
const {user, dispatch:transmit, loading:userloading} = UseAuthContext();





// useeffect ti handle cart

useEffect(() => {
  if(!product){
    return
  }
  dispatch({ type: 'setloading', payload: true });
  const updateCartFromStorage = () => {

    const items = JSON.parse(localStorage.getItem("myItems") || "[]");

    const data = product && product
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
}, [product]);

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
  if(user?.uid !== process.env.REACT_APP_Admin){
    dispatch({ type: 'setloading', payload: false });
    return
  }
  const unSubscribe = onSnapshot(orderRef, (snapshot) => {
    const data: OrderItem[] = snapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        name:docData.name,
        address:docData.address,
        cart:docData.cart,
        city:docData.city,
        country:docData.country,
        email:docData.email,
        phone:docData.phone,
        status:docData.status,
        totalPrice:docData.totalPrice,
        state:docData.state
      };
    });

    dispatch({ type: 'getOrder', payload: data });
    console.log(data, 'orders');
    dispatch({ type: 'setloading', payload: false });
  }, (error) => {
    console.error('Error fetching data:', error);
    dispatch({ type: 'setloading', payload: false });
  });

  return () => unSubscribe();
}, [user]);

//useeffect to fetch users
useEffect(() => {
  dispatch({ type: 'setloading', payload: true });
  if(!user){
    dispatch({ type: 'setloading', payload: false });
    return
  }
  const unSubscribe = onSnapshot(userRef, (snapshot) => {
    const data: userDataType[] = snapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        userName:docData.userName,
        email:docData.email,
        userId:docData.userId
      };
    });

    dispatch({ type: 'getUserData', payload: data });
    console.log(data, 'users');
    dispatch({ type: 'setloading', payload: false });
  }, (error) => {
    console.error('Error fetching data:', error);
    dispatch({ type: 'setloading', payload: false });
  });

  return () => unSubscribe();
}, [user]);

//use effect to get products
useEffect(() => {
  console.log('products')
  dispatch({ type: 'setloading', payload: true });
  const unSubscribe = onSnapshot(productRef, (snapshot) => {
    const data: productType[] = snapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        measurement: docData.measurement,
        title: docData.title,
        price: docData.price,
        fileUrls: docData.fileUrls
      };
    });

    dispatch({ type: 'getProducts', payload: data });
    console.log(data, 'products');
    dispatch({ type: 'setloading', payload: false });
  }, (error) => {
    console.error('Error fetching data:', error);
    dispatch({ type: 'setloading', payload: false });
  });

  return () => unSubscribe();
}, []);
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
      <Route index element={<AdminProtectedRoutes user={user}><Admin/></AdminProtectedRoutes>}/>
      <Route path="adminsession" element={<AdminGuestRoutes user={user}><Session/></AdminGuestRoutes>}/>
      <Route path="adminUpload" element={<AdminUpload/>} />
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