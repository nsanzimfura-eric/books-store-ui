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
import InfiniteScroll from "../../components/InfiniteScroll";

const BooksDataComponent = () => {
    const [booksData, setBooksData] = useState([])
    const [displayData, setDisplayData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadMore, setLoadMore] = useState(false)
    const { data, loading, error, handler } = useFetchData();
    const [hasMore, setHasMore] = useState(true);
    const itemsPerPage = 10;

    useEffect(() => {
        void handler(backendAPi.getAllBooks);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!loading && data) {
            setBooksData(data.data)
            // Initially load first set of data
            setDisplayData(data.data.slice(0, itemsPerPage));
            setCurrentIndex(itemsPerPage);
        }
    }, [data, loading])

    const handleMoreData = async () => {
        if (displayData.length <= data.data.length) {
            if (!loading && !loadMore && hasMore && data) {
                setLoadMore(true);
                const nextIndex = currentIndex + itemsPerPage;
                setTimeout(() => {
                    const newData = booksData.slice(0, nextIndex);
                    setBooksData(data.data)
                    setDisplayData(displayData => [...displayData, ...newData]);
                    setCurrentIndex(nextIndex);
                }, 1000);


            }
        } else {
            setLoadMore(false);
            setHasMore(false);
        }
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
                    {!loading && displayData &&
                        displayData.map((book: BookInterFace) => {
                            return (
                                <div key={book.id} className="cardWrapper">
                                    <CardService
                                        book={book}
                                    />
                                </div>
                            )
                        })
                    }
                    {hasMore && !loading && data && <InfiniteScroll onReachBottom={handleMoreData} />}
                    <div className="w-100 d-flex justify-content-center">
                        {hasMore && loadMore && data && <LoadinSpinner />}
                        {!hasMore && !loading && data && <p className="text-success">No more books to load!</p>}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default BooksDataComponent