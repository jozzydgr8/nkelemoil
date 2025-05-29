import { User } from "firebase/auth"
import { env } from "process"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

type proptype={
    user:User | null,
    children: ReactNode
}
export const GuestRoutes = ({children, user}:proptype)=>{
   return !user ? <>{children}</> :<Navigate to={'/nkelemoil'}/>
}

export const AdminGuestRoutes = ({children, user}:proptype)=>{
    return user?.uid !== process.env.REACT_APP_Admin ? <>{children}</>:<Navigate to={'/admin'} />
}