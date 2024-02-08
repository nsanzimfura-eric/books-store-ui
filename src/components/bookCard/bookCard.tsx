import { BookInterFace } from "../../utils/interfaces";
import styles from "./bookCard.module.scss";

interface Book {
    book: BookInterFace
}

const BookCard = (props: Book) => {
    const { book } = props;
    const handleAddToCart = () => {
        console.log(book);

    }

    return (
        <div className={`${styles.bookCard} card bg-none d-flex flex-column`}>
            <img src={book.cover_image} className="card-img-top img-fluid img-cover" alt="Single Service cover" />
            <div className="card-body bg-dark">
                <h5 className="card-title">{book.title}</h5>
                <div className="card-text d-flex">
                    <span className="me-auto">{book.tags}</span>
                    <span>Points: <strong>{book.points}</strong></span>
                </div>
                <div className="d-flex py-2 justify-content-center"><button onClick={handleAddToCart} className="appBtn">Add to cart</button></div>
            </div>
        </div>
    )
}

export default BookCard