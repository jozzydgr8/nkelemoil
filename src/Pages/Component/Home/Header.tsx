
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
                    Get Quality Palm Oil Delivered Worldwide – Fresh, Pure & Affordable
                    Looking for where to get palm oil you can trust? Whether you need a single bottle or bulk supply, 
                    we deliver fresh and premium palm oil straight from the farm to your doorstep — rich in taste and perfect for home or commercial use, anywhere in the world.
                    </p>
                    <div style={styles.buttoncontainer}>
                    <FlatButton title='view Products' onClick={()=>console.log('products')}/>
                    </div>
                </div>
                
            </div>
        </section>
    )
}