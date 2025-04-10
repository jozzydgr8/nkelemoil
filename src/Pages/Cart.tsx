import { useNavigate } from "react-router-dom";
import { UseContextData } from "../Context/UseContextData";
import { palmOilProducts } from "../data";
import FlatButton from "../shared/FlatButton";
import { DeleteOutlined } from "@ant-design/icons";

export function Cart() {
  const {cart} = UseContextData();
  const navigate = useNavigate();
  // Get the items directly from localStorage
  const cartItems = JSON.parse(localStorage.getItem("myItems") || "[]");

  // Merge quantity with palmOilProducts
  const data = palmOilProducts
    .filter((product) =>
      cartItems.some((i: { id: string }) => String(product.id) === i.id)
    )
    .map((product) => {
      const matchedItem = cartItems.find(
        (i: { id: string }) => String(product.id) === i.id
      );
      return {
        ...product,
        quantity: matchedItem?.quantity || 1,
      };
    });

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

  // Remove item from localStorage and reload the page
  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter((item: { id: string }) => item.id !== id);
    localStorage.setItem("myItems", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("cartUpdated")); 
  };

  return (
    <section>
      <div className="container-fluid">
        <h1>Cart</h1>
        { cart && cart.length > 0 ? (
          cart.map((item) => (
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
        { cart && cart.length > 0 && (
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
