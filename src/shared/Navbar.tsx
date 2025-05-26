import {  Link, useNavigate } from "react-router-dom"
import FlatButton from "./FlatButton"
import { UseAuthContext } from "../Context/UseAuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../App";
import { UseContextData } from "../Context/UseContextData";

function Navbar() {
  const navigate = useNavigate();
  const {user} = UseAuthContext();
  const {dispatch} = UseContextData();

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem('myItems');
    dispatch({ type: "getcart", payload: null });

    window.dispatchEvent(new Event("cartUpdated"));
  
    navigate('/nkelemoil');
  };
  return (
  <>
  <nav className="navbar navbar-expand-lg " data-bs-theme="light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">NKELEM PALM OIL</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link active" to="/nkelemoil">Home</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/nkelemoil/#product">Products</a>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="#">Dashboard</Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link active" to={'/nkelemoil/cart'}>Cart</Link>

        </li>
        <li className="nav-item">
          {user && <Link className="nav-link active" to={'/nkelemoil/order'}>Orders</Link>}

        </li>
        <li className="nav-item">
          <div >
          {!user ? <FlatButton title="Sign in" onClick={()=>navigate('/nkelemoil/user')}/> : <FlatButton title="Log Out" onClick={handleLogout} className="btn-success"/>}
            
          </div>
        </li>


      </ul>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar