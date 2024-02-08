import Footer from "../../ui/Footer/Footer";
import NavbarComponent from "../../ui/Navbar/Navbar";
import CartComponent from "../../ui/cartComponent/cartComponent";
import styles from "./Cart.module.scss";

const Cart = () => {

    return (
        <div className={styles.cart} id="servicesPage">
            <NavbarComponent />
            <CartComponent />
            <Footer />
        </div>
    )
}

export default Cart