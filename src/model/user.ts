import { CartItem } from "./Items";

export interface BillingInfo {
    address: string;
    city: string;
    state: string;
    pincode: string;
  }
  
  export interface User {
    id: number;
    fullname: string;
    email: string;
    phone: string;
    password: string;
    cart: CartItem[];
    billing: BillingInfo;
  }