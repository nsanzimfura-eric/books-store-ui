import { useDispatch } from "react-redux";
import { setUpdateCart } from "../ui/cartComponent/cartSlice";
import { BookInterFace, CartInterface } from "../utils/interfaces";

const useUpdateCart = () => {
  const dispatch = useDispatch();
  const addToCart = (book: BookInterFace) => {
    const LSCart = localStorage.getItem("cart");
    let cart: CartInterface[] = LSCart ? JSON.parse(LSCart) : [];
    let found = false;

    // Update quantity if the book is already in the cart
    cart = cart.map((item: CartInterface) => {
      if (item.book.id === book.id) {
        found = true;
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    // If the book wasn't found, add it to the cart
    if (!found) {
      cart.push({ book, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    // Dispatch to Redux store
    dispatch(setUpdateCart(cart));
  };

  return { addToCart };
};

export default useUpdateCart;
