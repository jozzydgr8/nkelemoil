import { Link } from "react-router-dom"
export const Footer = ()=>{
    const styles = {
        container:{
            backgroundColor:'black',
            color:'gray'
        },
        heading:{
            color:'white'
        },
        
    }
    return(
        <section style={styles.container}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <h3 style={styles.heading}>Nkelem Palm oil</h3>
                        <br/>
                        <p>
                        Your trusted online source for the finest quality palm oil in Nigeria. 
                        As a leading e-commerce platform, we specialize in providing premium palm oil to homes and businesses 
                        across the country. Whether you're looking to buy palm oil online, purchase in bulk, 
                        or simply discover the best palm oil for cooking and industrial use, we've got you covered.
                        </p>
                    </div>
                    <div className="col-md-3">
                        <h3 style={styles.heading}>Information</h3>
                        <br/>
                        <Link to={'#'}>Contact Us</Link>
                        
                    </div>
                    <div className="col-md-3">
                        <h3 style={styles.heading}>My Account</h3>
                        <br/>
                        <Link to={'#'}>My account</Link>
                        <br/> <br/>
                        <Link to={'#'}>Checkout</Link>
                        <br/> <br/>
                        <Link to={'#'}>Order History</Link>
                        <br/> <br/>
                        <Link to={'#'}>Login or Register</Link>

                    </div>
                    <div className="col-md-3">
                        <h3 style={styles.heading}>Customer Service</h3>
                        <br/>
                        <Link to={'#'}>Orders & Returns</Link>
                        <br/> <br/>
                        <Link to={'#'}>Terms & Conditions</Link>
                    </div>
                </div>
                <br/>
                <hr/>
                <div style={{textAlign:'center', marginTop:'20px'}}>
                    ©2025 NKELEM-OIl All Rights Reserved
                </div>
            </div>
        </section>
    )
}