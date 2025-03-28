export interface IRating {
  rate: number;
  count: number;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: IRating;
  quantity?: number;
}

export interface ICartContext {
  cart: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, change: number) => void;
}
