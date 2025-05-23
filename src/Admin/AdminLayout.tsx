import { Outlet } from "react-router-dom";
import { SideNav } from "../shared/SideNav";
import ScrollToTop from "../shared/ScrollToTop";
// import { Header } from "./shared/Header";


export default function AdminLayout(){

    return(
        
        <>
        <ScrollToTop/>
        <div className="displaygrid">
            
            {/* sidenav */}
            <div className="one">
                <SideNav/>
            </div>
            {/* Header */}
            <div className="second">
             <h1 className="text-center" style={{
                color:'#198754',
                paddingTop:'20px',
             }}>Welcome to NkelemOIl admin </h1>
            </div>
            {/* Outlet */}
            <div className="three">
            <Outlet/>
            </div>

        </div>
        </>
    )
}