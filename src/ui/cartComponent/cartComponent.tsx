/* eslint-disable */
import { useSelector } from "react-redux";
import styles from "./cartComponent.module.scss";
import { Container, Badge, Stack } from "react-bootstrap";
import { RootState } from "../../store/store";

const CartComponent = () => {
    const cartData = useSelector((state: RootState) => state.cartReducer.cart);

    return (
        <div className={styles.cartComponent} id="services">
            <Container className="mb-5">
                {cartData.length}

            </Container>
        </div>
    )
}

export default CartComponent