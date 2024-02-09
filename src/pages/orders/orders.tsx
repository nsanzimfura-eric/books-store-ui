/* eslint-disable */
import { Badge, Button, Container, Stack, Table } from "react-bootstrap";
import Footer from "../../ui/Footer/Footer";
import NavbarComponent from "../../ui/Navbar/Navbar";
import styles from "./orders.module.scss";
import { useEffect, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { apiRoutes, backendAPi } from "../../utils/constants";
import LoadinSpinner from "../../components/loadinSpinner/loadinSpinner";
import InfiniteScroll from "../../components/InfiniteScroll";
import useDeleteData from "../../hooks/useDeleteData";

const Orders = () => {
    const { data, loading, error, handler } = useFetchData();
    const [booksData, setBooksData] = useState([])
    const [displayData, setDisplayData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadMore, setLoadMore] = useState(false)
    const [hasMore, setHasMore] = useState(true);
    const [showDeleteFeature, setShowDeleteFeature] = useState(false);
    const [orderPrice, setOrderPrice] = useState(0);
    const itemsPerPage = 6;
    // cancel order
    const { data: dataDelete, loading: LoadingDelete, error: ErrorDelete, handler: cancelOrder } = useDeleteData()


    useEffect(() => {
        void handler(backendAPi.getUserOrders);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!loading && data) {
            setBooksData(data.data)
            // Initially load first set of data
            setDisplayData(data.data.slice(0, itemsPerPage));
            setCurrentIndex(itemsPerPage);

            const totalPrice = data.data?.reduce((acc: any, currentItem: any) => {
                return acc + (currentItem.book[0]?.points * currentItem.quantity);
            }, 0);
            setOrderPrice(totalPrice)
        }
    }, [data, loading]);

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

    const handleCancelOrder = () => {
        void cancelOrder(backendAPi.cancelOrder);
        setShowDeleteFeature(true)
    }

    useEffect(() => {
        if (!LoadingDelete && dataDelete) {
            setDisplayData([])
            setBooksData([])
            setOrderPrice(0)
            setShowDeleteFeature(false)

        }
    }, [LoadingDelete, dataDelete]);

    return (
        <div className={styles.orders} id="servicesPage">
            <NavbarComponent />
            <div className="d-flex justify-content-center">
                <h3 className="title my-4 text-center">The order list you recently placed: </h3>
            </div>
            <Container>
                {error && !loading && !data &&
                    <Stack direction="horizontal">
                        <Badge bg="danger">{error?.message}</Badge>
                    </Stack>
                }
                {ErrorDelete && !LoadingDelete && !dataDelete &&
                    <Stack direction="horizontal">
                        <Badge bg="danger">{ErrorDelete?.message}</Badge>
                    </Stack>
                }
                {displayData?.length > 0 &&
                    <div className="d-flex justify-content-between flex-wrap">
                        <p className="intru">
                            Total Cost You spent on you Order <Badge bg="secondary" className="mx-2 costTotal px-2">{orderPrice} points</Badge>
                        </p>
                        {!showDeleteFeature && <Button variant="danger" onClick={handleCancelOrder} className="px-5 py-2 ms-4">Cancel Order</Button>}
                        {showDeleteFeature && !ErrorDelete && !dataDelete && <LoadinSpinner />}
                    </div>
                }
            </Container>
            <Container className="ordersWrapper">
                {loading && <LoadinSpinner />}
                {!loading && data &&
                    <div className="w-100 ordersTable">
                        <Table striped bordered hover>
                            {displayData?.length > 0 &&
                                <thead>
                                    <tr>
                                        <th>list</th>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                            }
                            <tbody>
                                {displayData?.map((orderData: any, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><div><img src={orderData?.book[0]?.cover_image} alt="Book" /> <strong>{orderData?.book[0]?.title}</strong></div></td>
                                            <td>{orderData.quantity}</td>
                                            <td>{orderData?.book[0]?.points * orderData.quantity}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        {hasMore && !loading && data && <InfiniteScroll onReachBottom={handleMoreData} />}
                        <div className="w-100 d-flex justify-content-center">
                            {hasMore && loadMore && data && <LoadinSpinner />}
                            {!hasMore && !loading && data && <p className="text-success">No more Orders to load!</p>}
                        </div>
                    </div>}
                {!loading && displayData?.length === 0 && !showDeleteFeature && <div className="NoOrders">
                    <div ><p>No Order Placed! Consider going to <a href={apiRoutes.home} className="mx-2">home</a></p>to add your favorite books to cart</div>
                </div>}
            </Container>
            <Footer />
        </div>
    )
}

export default Orders