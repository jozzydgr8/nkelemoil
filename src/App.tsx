import { RouterProvider } from "react-router";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import HomePage from './Pages/HomePage'
import Layout from "./Layout";
import { Idlayout } from "./Pages/IdLayout";


function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/nkelemoil" element={<Layout/>}>
      <Route index element={<HomePage/>}/>
      <Route path=":id" element={<Idlayout/>} />
      
    </Route>
  ))
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;