export interface Item {
    id: number;
    img: string;
    title: string;
    desc: string;
    price: string;
    type: string;
    discount: string;
}

export interface CartItem extends Item {
    quantity: number;   
}

export interface CartState {
    cartItems: CartItem[];
}

export interface HocProps {
  data: Item[];
  loading: boolean;
  error: string | null;
}