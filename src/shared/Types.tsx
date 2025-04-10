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
    quantity: any; id: number; title: string; image: string;
};