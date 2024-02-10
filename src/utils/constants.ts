const baseUrl = import.meta.env.VITE_API_URL as string;

export const apiRoutes = {
  home: "/",
  cart: "/cart/",
  orders: "/orders/",
  login: "/login/",
  register: "/register/",
};

export const backendAPi = {
  getAllBooks: `${baseUrl}/books`,
  getUserOrders: `${baseUrl}/orders`,
  cancelOrder: `${baseUrl}/orders`,
  login: `${baseUrl}/auth/login`,
  signUp: `${baseUrl}/auth/register`,
  placeOrder: `${baseUrl}/orders`,
};
