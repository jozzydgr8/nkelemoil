import {  Link, useNavigate } from "react-router-dom"
import FlatButton from "./FlatButton"

function Navbar() {
  const navigate = useNavigate();
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
          <Link className="nav-link active" aria-current="page" to="/nkelemoil">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="#">Browse</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="#">Dashboard</Link>
        </li>
        <li className="nav-item">
          <div >
          <FlatButton title="Sign in" onClick={()=>navigate('#')}/>
            
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