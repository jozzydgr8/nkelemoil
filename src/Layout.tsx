import { Outlet } from "react-router-dom"
import Navbar from "./shared/Navbar"
import { HeaderComponent } from "./shared/HeaderComponent"
import ScrollToTop from "./shared/ScrollToTop"

function Layout() {
  return (
    <div>
      <ScrollToTop/>
        <Navbar/>
        <HeaderComponent/>
        <Outlet/>
        
    </div>
  )
}

export default Layout
