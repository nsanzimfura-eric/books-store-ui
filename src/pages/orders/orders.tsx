import { Container } from "react-bootstrap";
import Footer from "../../ui/Footer/Footer";
import NavbarComponent from "../../ui/Navbar/Navbar";
import styles from "./orders.module.scss";

const Orders = () => {

    return (
        <div className={styles.orders} id="servicesPage">
            <NavbarComponent />
            <Container>
                orders
            </Container>
            <Footer />
        </div>
    )
}

export default Orders