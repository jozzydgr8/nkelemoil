import { TruckOutlined, SafetyCertificateOutlined, DollarCircleOutlined } from '@ant-design/icons';
export const Benefit = ()=>{
    const styles = {
        container:{
            display:'flex',
            justifyContent:'space-around'
        },
        icon:{
            fontSize:'40px',
        },
        text:{
            fontWeight:'bold',
           
        },

    }
    return(
        <section className='benefitsection'>
            <div style={styles.container} className="container-fluid">
                <div className='benefitcontainer'>
                    <TruckOutlined style={styles.icon}/>
                    <p style={styles.text}>Fast Delivery</p>
                </div>
                <div className='benefitcontainer'>
                    <SafetyCertificateOutlined style={styles.icon}/>
                    <p style={styles.text}>Pure Quality </p>
                </div>
                <div className='benefitcontainer'>
                    <DollarCircleOutlined style={styles.icon}/>
                   <p style={styles.text}> Affordable Prices</p>
                </div>
            </div>
        </section>
    )
}