import { User } from "firebase/auth"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

type proptype={
    user:User | null,
    children: ReactNode
}
export const ProtectedRoutes = ({children, user}:proptype)=>{
    return user ? <>{children}</> :<Navigate to={'/nkelemoil/user'}/>
}

export const AdminProtectedRoutes = ({children,user}:proptype)=>{
    return user?.uid === process.env.REACT_APP_Admin ? <>{children}</>:<Navigate to={'/admin/adminsession'}/>
}