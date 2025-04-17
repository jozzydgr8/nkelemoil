import { useNavigate } from "react-router-dom";
import { palmOilProducts } from "../data";
import FlatButton from "../shared/FlatButton";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { UseContextData } from "../Context/UseContextData";

export function Cart() {
  const {cart} = UseContextData();
  console.log("Cart items in map:", cart)
  const navigate = useNavigate();

  // Get the items directly from localStorage
  const cartItems = JSON.parse(localStorage.getItem("myItems") || "[]");

  // Merge quantity from localStorage into palmOilProducts

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

  // Remove an item from localStorage and dispatch cartUpdated event
  const removeItem = (id: string) => {
    // const itemRemoved = cart?.find((item) => String(item.id) === id);
  
    // const updatedItems = cartItems.filter((item: { id: string }) => item.id !== id);
    // localStorage.setItem("myItems", JSON.stringify(updatedItems));
    // window.dispatchEvent(new Event("cartUpdated"));
  
    // toast.info(`${itemRemoved?.title} has been removed from your cart.`);
  };
  

  // Calculate total price
  const totalPrice = cart?.reduce((acc, item) => {
    return acc + item.price * parseInt(item.quantity);
  }, 0);

  return (
    <section>
      <div className="container-fluid">
        <h1>Cart</h1>

        {cart && cart.length > 0 ? (
          <div>
            {

            cart.map((item) => (
              <div style={styles.container} key={item.id}>
                <div style={styles.content}>
                  <div>
                    <p><strong>{item.title}</strong></p>
                    <p>Quantity: {item.quantity}</p>
                    <p>
                      <strong>
                        ₦{(item.price * parseInt(item.quantity)).toLocaleString()}
                      </strong>{" "}
                      <small style={{ fontWeight: "normal" }}>
                        (₦{item.price.toLocaleString()} x {item.quantity})
                      </small>
                    </p>
                  </div>

                  <DeleteOutlined
                    style={styles.icon}
                    onClick={() => removeItem(String(item.id))}

                  />
                </div>
              </div>
            ))}

            {/* Total section */}
            <div>
              <strong>Total: ₦{totalPrice?.toLocaleString()}</strong>
            </div>

            {/* Checkout Button */}
            <div>
              <FlatButton
                title="Proceed to Checkout"
                onClick={() => navigate("/nkelemoil/cart/checkout")}
              />
            </div>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </section>
  );
}
