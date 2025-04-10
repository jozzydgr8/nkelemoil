import {CloseOutlined} from '@ant-design/icons'
import { CartItem } from './Types'

type props = {
    item:CartItem
}
export const FlatCart = ({item}:props)=>{

    return(
        <>
         <p>{item.title}</p>
        <p style={{fontWeight:"bold", fontSize:"18px", display:"flex"}}> <CloseOutlined/> {item.quantity}</p></>
        
    )
}