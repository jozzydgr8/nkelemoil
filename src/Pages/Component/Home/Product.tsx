
import FlatButton from "../../../shared/FlatButton";
import palmoil from '../../../assets/fiveliter_palmoil.jpeg'
import { Link, NavLink } from "react-router-dom";
import { UseContextData } from "../../../Context/UseContextData";

type props={
  header:string
}
// Helper to split into chunks of 5
const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const styles = {
    content:{
       
       padding:'16px',
       borderRadius:'7px',
       backgroundColor:"#FAFAFA"

    },
    productbackground:{
        height:'200px',
        backgroundSize:'contain',
        backgroundPosition:'center center',
        backgroundRepeat:'no-repeat',
    },
    title:{
        fontWeight:'bold',
        marginTop:'5px',
    },
    text:{

    }
  }
  

export const Product = ({header}:props) => {
const {product} = UseContextData();
  const productChunks = chunkArray(product || [], 5);

  return (
    <section id="product">
        <div>
        <h2 style={{textAlign:'center', margin:'10px 0'}}>{header}</h2>
        
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          {productChunks.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {productChunks.map((chunk, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <div  className="product">
                {chunk.map((data) => (
                  <Link to={`/nkelemoil/${data.id}`} style={styles.content} key={data.id} >
                    <div style={{...styles.productbackground,
                       backgroundImage: `url(${data.fileUrls && data.fileUrls[0].url})`}}>

                    </div>
                    <div>
                      <p style={styles.title}>{data.title}</p>
                      <p style={styles.text}>{data.measurement}L</p>
                      <p style={styles.title}>#{data.price}</p>
                      <FlatButton title="Buy Now" onClick={()=>console.log('buy')} className="btn-success"/>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
{/* 
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button> */}
      </div>
        </div>
    </section>
  );
};
