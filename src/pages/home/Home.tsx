import Footer from "../../ui/Footer/Footer";
import NavbarComponent from "../../ui/Navbar/Navbar";
import BooksDataComponent from "../../ui/booksDataComponent/booksDataComponent";
import styles from "./Home.module.scss";

const Home = () => {

    return (
        <div className={styles.home}>
            <NavbarComponent />
            <BooksDataComponent />
            <Footer />
        </div>
    )
}

export default Home