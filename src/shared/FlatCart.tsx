import {CloseOutlined} from '@ant-design/icons'
import { CartItem } from './Types'

type props = {
    item:CartItem
}
export const FlatCart = ({item}:props)=>{

    return(
        <>
         <div>
         <p>{item.title}</p>
         <strong>
            ₦{(item.price * parseInt(item.quantity)).toLocaleString()}
        </strong>{" "}
         </div>
        <p style={{fontWeight:"bold", fontSize:"18px", display:"flex"}}> <CloseOutlined/> {item.quantity}</p>
        
        </>
        
        
    )
}