export type checkoutvalues={
    name: string;
    email: string; 
    phone: string; 
    country: string; 
    address: string; 
    city: string; 
    state: string; 
    deliveryNote?: string;
   
    
}
 export type productType = {
    id?: string,
    measurement: number,
    title: string,
    price: number,
    fileUrls:{
        imagePath:string;
        url:string;
    }[]
 }
export type CartItem = productType & {
    quantity: any; 
};

export type MenuItem = {
    label: React.ReactNode; // `label` can be a string or any ReactNode (e.g., JSX, string)
    key: string; // key is required for each menu item
    icon: React.ReactNode
  };

export type OrderItem = checkoutvalues & {cart:CartItem, id:string,  status:string, totalPrice:string}

export type userDataType ={
    userName:string,
    email:string,
    userId:string
}