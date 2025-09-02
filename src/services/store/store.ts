import type { AppState } from "../../types";

const INITIAL_STATE: AppState = {
  products: [],
  auth: {
    token: null,
    isAuthenticated: false,
    isLoggedIn: false,
    user: {
      image: "https://i.pravatar.cc/150?img=34",
      username: "dondada",
      firstName: "Skuba",
      lastName: "Koooper",
      id: 12345,
      email: "skub@mail.com",
      phone: "4121234567",
    },
  },
  cart: [],
  currentPage: "/",
  selectedProduct: null,
  numberOfItems: 2,
};

export const state = INITIAL_STATE;
