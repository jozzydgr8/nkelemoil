import { User } from "firebase/auth"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

type proptype={
    user:User | null,
    children: ReactNode
}
export const GuestRoutes = ({children, user}:proptype)=>{
   return !user ? <>{children}</> :<Navigate to={'/nkelemoil'}/>
}