import { useNavigate, useParams } from "react-router-dom";
import demoImage from '../assets/fiveliter_palmoil.jpeg';
import FlatButton from "../shared/FlatButton";
import { Product } from "./Component/Home/Product";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UseContextData } from "../Context/UseContextData";

export function Idlayout() {
  const {product} = UseContextData();
  const { id } = useParams();
  const navigate = useNavigate();
  const [number, setNumber] = useState(1);
  const data = product && product.find((item) => item.id && item.id.toString() === id);

  useEffect(() => {
    if (!data) {
      navigate('/nkelemoil', { replace: true });
    }
  }, [data, navigate]);

  const styles = {
    backgroundimage: {
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      height: '300px',
    },
    title: {
      fontWeight: 'bold',
      margin: '10px 0',
    },
    placeholder: {
      fontWeight: 'bold',
    },
    container: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      border: 'solid 1px rgb(192, 192, 192)',
      padding: '2px 20px',
    },
    information: {
      margin: '30px 0',
    },
    buttoncontainer: {
      margin: '10px 0',
    },
    number: {
      backgroundColor: '#FAFAFA',
      padding: '18px 32px',
    },
    iconcontainer: {
      marginRight: '16px',
      cursor: 'pointer',
    },
  };

  const addToStorage = () => {
    const existing = JSON.parse(localStorage.getItem('myItems') || '[]');
    const itemIndex = existing.findIndex((item: { id: string }) => item.id === id);

    if (itemIndex !== -1) {
      existing[itemIndex].quantity += number;
      toast.info(`Increased quantity of ${data?.title} in your cart.`);
    } else {
      existing.push({ id, quantity: number });
      toast.info(`${data?.title} has been added to your cart.`);
    }

    localStorage.setItem('myItems', JSON.stringify(existing));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  if (!data) return null; // Avoid rendering until redirect completes

  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div
              style={{
                ...styles.backgroundimage,
                backgroundImage: `url(${data.fileUrls && data.fileUrls[0].url})`,
              }}
            ></div>

          </div>

          <div className="col-md-6">
            <div>
              <h3 style={styles.title}>{data.title}</h3>
              <div><span style={styles.placeholder}>Measurement:</span> {data.measurement}</div>

              <div style={styles.container}>
                <div style={styles.number}>{number}</div>

                <div style={styles.iconcontainer}>
                  <div style={styles.icon} onClick={() => setNumber((prev) => prev + 1)}>+</div>
                  <div style={styles.icon} onClick={() => setNumber((prev) => (prev > 1 ? prev - 1 : prev))}>-</div>
                </div>
              </div>

              <h3 style={styles.title}>#{data.price}</h3>

              <div style={styles.buttoncontainer}>
                <FlatButton title="ADD TO CART" className="btn-success" onClick={addToStorage} />
              </div>
            </div>
          </div>
        </div>

        <div style={styles.information}>
          <h3>Additional Information</h3>
          <h4 className="background" style={{ padding: '16px' }}>Measurement: {data.measurement}</h4>
        </div>

        <Product header="Similar Product" />
      </div>
    </section>
  );
}
