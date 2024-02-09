/* eslint-disable */
import styles from "./booksDataComponent.module.scss";
import CardService from "../../components/bookCard/bookCard";
import { Container, Badge, Stack, Form } from "react-bootstrap";
import useFetchData from "../../hooks/useFetchData";
import React, { useEffect, useState } from "react";
import { backendAPi } from "../../utils/constants";
import LoadingPage from "../../components/loadinPage/loadinPage";
import { BookInterFace } from "../../utils/interfaces";
import LoadinSpinner from "../../components/loadinSpinner/loadinSpinner";
import InfiniteScroll from "../../components/InfiniteScroll";
import { motion } from "framer-motion"

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
    //   filter
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value.trim();
        if (value) {
            if (value.toLowerCase() !== 'all') {
                const filteredBooks = booksData.filter((book: BookInterFace) => {
                    let wantedBook: BookInterFace | null = null
                    if (book.tags.split(',').includes(value.toLowerCase())) {
                        wantedBook = book;
                    }
                    return wantedBook;
                });
                setDisplayData(filteredBooks);
                setBooksData(filteredBooks);
            } else {
                setBooksData(data.data)
                setDisplayData(data.data.slice(0, itemsPerPage));
            }
        } else {
            setBooksData(data.data)
            setDisplayData(data.data.slice(0, itemsPerPage));
        }
    }


    //   search by title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        if (value) {
            const filteredBooks = booksData.filter((book: BookInterFace) => book.title.toLowerCase().includes(value.toLowerCase()));
            setDisplayData(filteredBooks);
            setBooksData(filteredBooks);
        } else {
            setBooksData(data.data)
            setDisplayData(data.data.slice(0, itemsPerPage));
        }
    }
    return (
        <div className={styles.booksDataComponent} id="services">
            <Container className="mb-5 containerWraper">
                <motion.h2 initial={{ y: -1000 }} animate={{ y: 0 }} transition={{ delay: 1, duration: 1.5 }} className="text-center w-100 title" >Featured books</motion.h2>
                <motion.small initial={{ y: -1000 }} animate={{ y: 0 }} transition={{ delay: 1.5, duration: 1.5 }} className="d-flex justify-content-center pb-3 text-light subTitle w-100">use your Points to order your favorite book to read</motion.small>
                {!loading && displayData &&
                    <motion.div initial={{ scale: 0.01 }} animate={{ scale: 1 }} transition={{ delay: 1, duration: 1 }} className="mt-3 mb-5">
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className="label">Search Book by Title</Form.Label>
                                <Form.Control type="text" placeholder="The Art Thief" onChange={handleTitleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label className="label">Select a Book category</Form.Label>
                                <Form.Select size="lg" onChange={handleCategoryChange}>
                                    <option value="all">all</option>
                                    <option value="Science">Science</option>
                                    <option value="Fiction">Fiction</option>
                                    <option value="Non-fiction">Non-fiction</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </motion.div>
                }
                <div className="servicesWrapper">
                    {loading && <LoadingPage />}
                    {!loading && !data && !error &&
                        <Stack direction="horizontal">
                            <Badge bg="danger">{error?.message}</Badge>
                        </Stack>
                    }
                    {!loading && displayData &&
                        displayData.map((book: BookInterFace, index) => {
                            return (
                                <div key={index} className="cardWrapper">
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