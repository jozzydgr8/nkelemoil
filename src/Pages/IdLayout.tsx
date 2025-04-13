import { useParams } from "react-router-dom"
import { palmOilProducts } from "../data";
import demoImage from '../assets/fiveliter_palmoil.jpeg'
import FlatButton from "../shared/FlatButton";
import { Product } from "./Component/Home/Product";
import { useState } from "react";
import { toast } from "react-toastify";
export function Idlayout (){
    const {id} = useParams();
    const [number, setNumber] =useState(1);
    const data = palmOilProducts.find(data => data.id.toString() == id);
    const styles ={
        backgroundimage:{
            backgroundImage:`url(${demoImage})`,
            backgroundSize:'contain',
            backgroundRepeat:'no-repeat',
            backgroundPosition:'center center',
            height:'300px'
        },
        title:{
            fontWeight:'bold', 
            margin:'10px 0',
        },
        placeholder:{
            fontWeight:'bold'
        },
        container:{
            display:'flex', 
            alignItems:'center',
        },
        icon:{
            border:'solid 1px rgb(192, 192, 192)', 
            padding:'2px 20px'
        },
        information:{
            margin:'30px 0',
        },
        buttoncontainer:{
            margin:'10px 0'
        },
        number:{backgroundColor:'#FAFAFA', padding:'18px 32px'},
        iconcontainer:{marginRight:'16px', cursor:'pointer'}
    }

    const addToStorage = () => {
        const existing = JSON.parse(localStorage.getItem('myItems') || '[]');
      
        // Check if the item already exists by id
        const alreadyExists = existing.some((item: { id: string }) => item.id === id);
      
        if (!alreadyExists) {
          existing.push({ id:id, quantity:number });
          localStorage.setItem("myItems", JSON.stringify(existing));
          window.dispatchEvent(new Event("cartUpdated"));
          toast.info(`${data?.title} has been added to your cart.`);

        }
      };
      
      
    return(
        <section>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <div style={styles.backgroundimage}>

                        </div>
                    </div>

                    <div className="col-md-6">
                        <div>
                            <h3 style={styles.title}>{data?.title}</h3>
                           
                            <div><span style={styles.placeholder}>Measurement:</span> {data?.quantity}</div>

 {/* how many user wants ti buy cintainer */}
                            <div style={styles.container}>

                                <div style={styles.number} >{number}</div>

                                <div style={styles.iconcontainer}>
                                    <div style={styles.icon} onClick={()=>setNumber(prev=>{
                                        return prev + 1;
                                    })}>
                                    +
                                    </div>
                                    <div style={styles.icon} onClick={()=>setNumber(prev=>{
                                        if (prev === 1){
                                            return prev
                                        }
                                        return prev - 1;
                                    })}>
                                    -
                                    </div>
                                   
                                </div>
                           
                            </div>

                            <h3 style={styles.title}>#{data?.price}</h3>

                            <div style={styles.buttoncontainer}>
                            <FlatButton title="ADD TO CART" onClick={addToStorage}/>
                            </div>
                            {/* how many user wants ti buy cintainer */}


                            
                        </div>
                    </div>
                </div>

                <div style={styles.information}>
                    <h3>Additional Information</h3>
                    <h4 className="background" style={{padding:'16px'}}> Measurement: {data?.quantity}</h4>
                </div>
                <Product header="Similar Product"/>
            </div>
        </section>
    )
}