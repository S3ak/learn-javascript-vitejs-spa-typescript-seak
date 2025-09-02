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
}

export interface AppState {
  products?: Product[];
  cart?: CartItem[];
  auth?: AuthState;
  currentPage?: string;
  selectedProduct?: Product | null;
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

export enum AvailabilityStatus {
  InStock = "In Stock",
  LowStock = "Low Stock",
}

export enum Category {
  Beauty = "beauty",
  Fragrances = "fragrances",
  Furniture = "furniture",
  Groceries = "groceries",
}

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

export enum ReturnPolicy {
  NoReturnPolicy = "No return policy",
  The30DaysReturnPolicy = "30 days return policy",
  The60DaysReturnPolicy = "60 days return policy",
  The7DaysReturnPolicy = "7 days return policy",
  The90DaysReturnPolicy = "90 days return policy",
}

export interface Review {
  comment: string;
  date: Date;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
}
