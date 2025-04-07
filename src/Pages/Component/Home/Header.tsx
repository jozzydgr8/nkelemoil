
import headerBackground from '../../../assets/darkpalmkernel_background.jpg'
import FlatButton from '../../../shared/FlatButton'
export const Header = ()=>{
    
    const styles ={
        container:{
            backgroundImage:`url(${headerBackground})`,
            backgroundSize:'cover',
            backgroundPosition:'center',
            height:'70vh'
        },
        content:{
            height:'100%',
            width:'100%',
            color:'white',
            padding:'5% 3%',
           
        },
        item:{
            width:"80%",
            display:'flex',
            height:'100%',
        
            
            
        },
        buttoncontainer:{
            marginTop:'20px'
        }
    }
    return(
        <section style={styles.container}>
            <div style={styles.content}>
                <div className='headeritem' style={{...styles.item, flexDirection:'column',justifyContent:'center'}}>
                    <h1>
                    Get Quality Palm Oil Online in Nigeria – Fresh, Pure & Affordable
                    </h1>
                    <p>
                    Looking for where to get palm oil you can trust? 
                    Buy bulk palm oil directly from our farm and enjoy the best palm oil delivered to your doorstep — 
                    rich in taste, perfect for home and commercial use.
                    </p>
                    <div style={styles.buttoncontainer}>
                    <FlatButton title='view Products' onClick={()=>console.log('products')}/>
                    </div>
                </div>
                
            </div>
        </section>
    )
}