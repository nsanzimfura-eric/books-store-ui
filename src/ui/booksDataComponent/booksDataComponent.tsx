/* eslint-disable */
import styles from "./booksDataComponent.module.scss";
import CardService from "../../components/bookCard/bookCard";
import { Container, Badge, Stack } from "react-bootstrap";
import useFetchData from "../../hooks/useFetchData";
import { useEffect, useState } from "react";
import { backendAPi } from "../../utils/constants";
import LoadingPage from "../../components/loadinPage/loadinPage";
import { BookInterFace } from "../../utils/interfaces";
import LoadinSpinner from "../../components/loadinSpinner/loadinSpinner";

const BooksDataComponent = () => {
    const [booksData, setBooksData] = useState([])
    const [page, setPage] = useState(0)
    const { data, loading, error, handler } = useFetchData();

    useEffect(() => {
        void handler(backendAPi.getAllBooks);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!loading && data) {
            setBooksData(data.data)
        }
    }, [data, loading])

    const handleMoreData = () => {
        setTimeout(() => {

        }, 500)
    }

    return (
        <div className={styles.booksDataComponent} id="services">
            <Container className="mb-5">
                <h2 className="text-center w-100" >Featured books</h2>
                <small className="d-flex justify-content-center pb-3 text-light w-100">use your Points to order your favorite book to read</small>
                <div className="servicesWrapper mt-3">
                    {loading && <LoadingPage />}
                    {!loading && !data && !error &&
                        <Stack direction="horizontal">
                            <Badge bg="danger">{error?.message}</Badge>
                        </Stack>
                    }
                    {!loading && data &&
                        data?.data?.map((book: BookInterFace) => {
                            return (
                                <div key={book.id} className="cardWrapper">
                                    <CardService
                                        book={book}
                                    />
                                </div>
                            )
                        })
                    }

                </div>
            </Container>
        </div>
    )
}

export default BooksDataComponent