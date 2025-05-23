export type checkoutvalues={
    name: string;
    email: string; 
    phone: string; 
    country: string; 
    address: string; 
    city: string; 
    state: string; 
    deliveryNote: string;
    
}

export type CartItem = {
    quantity: any; id: number; title: string; image?: string; price:number;
};

export type MenuItem = {
    label: React.ReactNode; // `label` can be a string or any ReactNode (e.g., JSX, string)
    key: string; // key is required for each menu item
    icon: React.ReactNode
  };

export type OrderItem = checkoutvalues & {cart:CartItem}