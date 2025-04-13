import { UseContextData } from "../Context/UseContextData"
import FlatButton from "../shared/FlatButton"
import { FlatCart } from "../shared/FlatCart"
import { checkoutvalues } from "../shared/Types"

type summaryprops ={
    data:checkoutvalues,
    handleSummary:(values:boolean)=>void
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
export const Summary = ({data, handleSummary }:summaryprops)=>{
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
                    <h3>Items: </h3>
                    {
                        cart?.map(item=>(
                            <div key={item.id} style={styles.content}>
                                <FlatCart item={item}/>
                            </div>
                        ))
                    }
                </div>
                    <small>Ensure all description matches before proceeding</small>
                <div>
                    <FlatButton title="Proceed to payment" onClick={()=>handleSummary(true)}/>
                </div>
            </div>

        </div>
    )
}