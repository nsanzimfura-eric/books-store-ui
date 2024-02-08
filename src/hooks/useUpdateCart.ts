import { BookInterFace, CartInterface } from "../utils/interfaces";
import { useDispatch } from "react-redux";
import { setUpdateCart } from "../ui/cartComponent/cartSlice";

const useUpdateCart = () => {
  const dispatch = useDispatch();

  const addToCart = (book: BookInterFace) => {
    let LSCart = localStorage.getItem("cart");
    if (!LSCart) {
      localStorage.setItem("cart", JSON.stringify([{ book, quantity: 1 }]));
      LSCart = localStorage.getItem("cart");
    }
    //  check for quantities
    const oldCart: CartInterface[] = JSON.parse(LSCart!);
    const newCart: CartInterface[] = [...oldCart];

    newCart?.forEach((singleCart: CartInterface) => {
      if (singleCart.book.id === book.id) {
        singleCart.quantity += 1;
      } else {
        newCart.push({ book, quantity: 1 });
      }
    });

    dispatch(setUpdateCart(newCart));
  };

  return { addToCart };
};

export default useUpdateCart;
