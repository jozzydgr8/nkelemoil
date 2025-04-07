import { Outlet } from "react-router-dom"
import Navbar from "./shared/Navbar"
import { Footer } from "./shared/Footer"
import { HeaderComponent } from "./shared/HeaderComponent"
import ScrollToTop from "./shared/ScrollToTop"

function Layout() {
  return (
    <div>
      <ScrollToTop/>
        <Navbar/>
        <HeaderComponent/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout
