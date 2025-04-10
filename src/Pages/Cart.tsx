import FlatButton from "../shared/FlatButton";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { UseContextData } from "../Context/UseContextData";


export function Cart() {
  const navigate = useNavigate();
  const { cart,  loading } = UseContextData();


  const styles = {
    container: {
      padding: "30px",
      borderBottom: "solid 1px black",
      borderRadius: "20px",
      marginBottom: "20px",
    },
    content: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    icon: {
      fontSize: "22px",
      cursor: "pointer",
    },
  };

  const removeItem = (id: string) => {
    if (!cart) return;
  
    const updatedItems = cart.filter((item) => item.id.toString() !== id);
  
    localStorage.setItem("myItems", JSON.stringify(updatedItems));
  
    // Optional: trigger a custom event if other components need to react
    window.dispatchEvent(new Event("cartUpdated"));
  };
  if(loading){
    return <>...loading</>
  }

  return (
    <section>
      <div className="container-fluid">
        <h1>Cart</h1>
        { cart && cart?.length > 0 ? (
          cart?.map((item) => (
            <div style={styles.container} key={item.id}>
              <div style={styles.content}>
                <div>
                  <p>
                    <strong>{item.title}</strong>
                  </p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <DeleteOutlined
                  style={styles.icon}
                  onClick={() => removeItem(JSON.stringify(item.id))}
                />
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}

        {cart && cart?.length > 0 && (
          <div>
            <FlatButton
              title="Proceed to Checkout"
              onClick={() => navigate('/nkelemoil/cart/checkout')}
            />
          </div>
        )}
      </div>
    </section>
  );
}
