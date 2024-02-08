const baseUrl = import.meta.env.VITE_API_URL as string;

export const apiRoutes = {
  home: "/",
  cart: "/card",
};

export const backendAPi = {
  getAllBooks: `${baseUrl}/books`,
  login: `${baseUrl}/auth/login`,
  signUp: `${baseUrl}/auth/register`,
  placeOrder: `${baseUrl}/orders`,
};