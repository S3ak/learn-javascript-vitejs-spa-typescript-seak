export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoggedIn: boolean;
}

export interface AppState {
  products?: Product[];
  cart?: CartItem[];
  auth?: AuthState;
  currentPage?: string;
  selectedProduct?: Product | null;
  numberOfItems: number;
}

export interface ProductResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

export interface Product {
  availabilityStatus: AvailabilityStatus;
  brand?: string;
  category: Category;
  description: string;
  dimensions: Dimensions;
  discountPercentage: number;
  id: number;
  images: string[];
  meta: Meta;
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: ReturnPolicy;
  reviews: Review[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
}

export type AvailabilityStatus = "In Stock" | "Low Stock";

export type Category = "beauty" | "fragrances" | "furniture" | "groceries";

export interface Dimensions {
  depth: number;
  height: number;
  width: number;
}

export interface Meta {
  barcode: string;
  createdAt: Date;
  qrCode: string;
  updatedAt: Date;
}

export type ReturnPolicy =
  | "No return policy"
  | "30 days return policy"
  | "60 days return policy"
  | "7 days return policy"
  | "90 days return policy";

export interface Review {
  comment: string;
  date: Date;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
}
