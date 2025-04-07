import { useEffect, useState } from "react";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const HeaderComponent = () => {
  const [cartCount, setCartCount] = useState(0);

  const styles = {
    icon: {
      fontSize: "30px",
    },
    iconcontainer: {
      border: "solid 1px black",
      borderRadius: "70%",
      padding: "16px 18px",
      width: "fit-content",
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1% 5%",
    },
    content: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
  };

  // Function to read and update cart count
  const updateCartCount = () => {
    const items = JSON.parse(localStorage.getItem("myItems") || "[]");
    setCartCount(items.length);
  };

  useEffect(() => {
    updateCartCount();

    // Listen for changes to localStorage (even from other tabs/windows)
    window.addEventListener("storage", updateCartCount);

    // Custom event system for same-tab local changes
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <section>
      <div style={styles.container}>
        <div style={styles.content}>
          <Link to="#">CONTACT US</Link>
        </div>
        <div>
          <Badge count={cartCount}>
            <ShoppingCartOutlined style={styles.icon} />
          </Badge>
        </div>
      </div>
    </section>
  );
};
