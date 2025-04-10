import { UseContextData } from "../Context/UseContextData"
import FlatButton from "../shared/FlatButton"
import { checkoutvalues } from "../shared/Types"
import {CloseOutlined} from '@ant-design/icons'
type summaryprops ={
    data:checkoutvalues
}

const styles = {
    content:{
        display:'flex',
        justifyContent:"space-between",
        alignItems:'center',
        margin:'20px 0'
    },
    container:{
        backgroundColor:'#FAFAFA',
        padding:'16px 30px',
        borderRadius:'20px'
    }
}
export const Summary = ({data }:summaryprops)=>{
    const {cart} = UseContextData();
    return(
        <div>
            <h1>Summary</h1>
            
            <div style={styles.container}>
                <div>
                    
                    <p style={styles.content}><strong>Name:</strong> {data.name}</p>
                    <p style={styles.content}><strong>Email:</strong>{data.email}</p>
                    <p style={styles.content}><strong>Phone:</strong> {data.phone}</p>
                    <p style={styles.content}><strong>Country:</strong> {data.country}</p>
                    <p style={styles.content}><strong>Address:</strong> {data.address}</p>
                    <p style={styles.content}><strong>State:</strong>{data.state}</p>
                    <p style={styles.content}><strong>City:</strong> {data.city}</p>

                </div>
                <div>
                    {
                        cart?.map(item=>(
                            <div key={item.id} style={styles.content}>
                                <p>{item.title}</p>
                                <p style={{fontWeight:"bold", fontSize:"18px", display:"flex"}}> <CloseOutlined/> {item.quantity}</p>
                            </div>
                        ))
                    }
                </div>

                <div>
                    <FlatButton title="Proceed to payment" onClick={()=>console.log('proceed')}/>
                </div>
            </div>

        </div>
    )
}