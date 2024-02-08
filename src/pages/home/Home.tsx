import Footer from "../../ui/Footer/Footer";
import BooksDataComponent from "../../ui/booksDataComponent/booksDataComponent";
import styles from "./Home.module.scss";

const Home = () => {

    return (
        <div className={styles.home} id="home">
            <BooksDataComponent />
            <Footer />
        </div>
    )
}

export default Home