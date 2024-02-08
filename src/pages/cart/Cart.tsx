import Footer from "../../ui/Footer/Footer";
import CartComponent from "../../ui/cartComponent/cartComponent";
import styles from "./Cart.module.scss";

const Cart = () => {

    return (
        <div className={styles.cart} id="servicesPage">
            <CartComponent />
            <Footer />
        </div>
    )
}

export default Cart