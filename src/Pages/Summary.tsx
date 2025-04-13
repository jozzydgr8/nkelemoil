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
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
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
                                <FlatCart item={item}/>
                            </div>
                        ))
                    }
                </div>

                <div>
                    <FlatButton title="Proceed to payment" onClick={()=>handleSummary(true)}/>
                </div>
            </div>

        </div>
    )
}