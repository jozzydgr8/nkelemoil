import { useState, useEffect } from "react";
import { palmOilProducts } from "../data";
import FlatButton from "../shared/FlatButton";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const [cartItems, setCartItems] = useState<{ id: string; quantity: number }[]>([]);
  const navigate = useNavigate();

  // Load items from localStorage when component mounts
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("myItems") || "[]");
    setCartItems(items);
  }, []);

  // Merge quantity with palmOilProducts
  const data = palmOilProducts
    .filter((product) =>
      cartItems.some((i) => String(product.id) === i.id)
    )
    .map((product) => {
      const matchedItem = cartItems.find((i) => String(product.id) === i.id);
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

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("myItems", JSON.stringify(updatedItems));
    setCartItems(updatedItems); // Re-render the component
    window.dispatchEvent(new Event("cartUpdated")); // optional if other parts need to listen
  };

  return (
    <section>
      <div className="container-fluid">
        <h1>Cart</h1>
        {data.length > 0 ? (
          data.map((item) => (
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

        {data.length > 0 && (
          <div>
            <FlatButton
              title="Proceed to Checkout"
              onClick={() => navigate('nkelemoil/checkout')}
            />
          </div>
        )}
      </div>
    </section>
  );
}
