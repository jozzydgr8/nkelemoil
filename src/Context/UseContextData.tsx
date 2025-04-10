import { useContext } from "react"
import { Context } from "./ContextData"

export const UseContextData = ()=>{
    const context = useContext(Context);
    if(!context){
        throw Error('context requires provider');
    }
    return context
}