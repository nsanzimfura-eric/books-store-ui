/* eslint-disable */
import styles from "./cartComponent.module.scss";
import { Container, Badge, Stack, Table, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { BookInterFace, CartInterface, UserInterface } from "../../utils/interfaces";
import { apiRoutes, backendAPi } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import usePostData from "../../hooks/usePostData";
import LoadinSpinner from "../../components/loadinSpinner/loadinSpinner";
import { useDispatch } from "react-redux";
import { setUpdateCart } from "./cartSlice";

const CartComponent = () => {
    const [cartData, setCartData] = useState<CartInterface[] | []>([]);
    const [orderPrice, setOrderPrice] = useState(0);
    const navigate = useNavigate();
    const { data, loading, error, handler } = usePostData()
    const dispatch = useDispatch();

    useEffect(() => {
        const cart: CartInterface[] = JSON.parse(localStorage.getItem("cart")!);
        setCartData(cart);

    }, []);
    // Calculate the total price
    useEffect(() => {
        const totalPrice = cartData?.reduce((acc, currentItem) => {
            return acc + (currentItem.book.points * currentItem.quantity);
        }, 0);
        setOrderPrice(totalPrice)

    }, [cartData]);

    // order books:
    const handleOrderBooks = () => {
        const user: UserInterface = JSON.parse(localStorage.getItem('user')!);
        if (!user) {
            // user is not logged in 
            navigate(apiRoutes.login);
        }
        if (user.points < orderPrice) {
            alert("You don't have enough points/Money")
        } else {
            const orderPayload = {
                order: cartData.map(item => ({
                    book_id: item.book.id,
                    quantity: item.quantity
                }))
            };
            const data = {
                url: backendAPi.placeOrder, body: orderPayload
            }
            void handler(data);
        }
    }

    // remove cart from LS and navigate to orders pages
    useEffect(() => {
        if (data && !loading && !error) {
            localStorage.removeItem('cart')
            navigate(apiRoutes.orders)
            //reduce user points
            const user: UserInterface = JSON.parse(localStorage.getItem('user')!);
            user.points = user.points - orderPrice;
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [data, loading])

    // remove item from cart 
    const handlerRemoveBook = (book: BookInterFace) => {
        const remainCartData = cartData.filter((item: CartInterface) => item.book.id !== book.id);
        setCartData(remainCartData);
        localStorage.setItem("cart", JSON.stringify(remainCartData));
        dispatch(setUpdateCart(remainCartData))
    }

    return (
        <div className={styles.cartComponent}>
            {cartData &&
                <Container className="mb-5 containerCart">
                    {loading && !data && !error &&
                        <div className="loadingWrapper">
                            <LoadinSpinner />
                        </div>
                    }
                    {error && !loading && !data &&
                        <Stack direction="horizontal">
                            <Badge bg="danger">{error?.message}</Badge>
                        </Stack>
                    }
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Book</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartData?.map((data: CartInterface, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td><div><img src={data.book.cover_image} alt="Cover" /> {data.book.title} </div></td>
                                        <td>{data.quantity}</td>
                                        <td>{data.book.points}</td>
                                        <td>{data.book.points * data.quantity}</td>
                                        <td className="d-flex justify-content-center align-items-center bg-none"><button className="btn btn-danger" onClick={() => handlerRemoveBook(data.book)}>Remove</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <div className="mt-3 bg-secondary d-flex justify-content-center align-items-center py-3">
                        <h5>Total Price: <strong className="Text-success mx-3">{orderPrice}</strong></h5>
                        <Button variant="primary" onClick={handleOrderBooks} className="ms-5 px-5 py-2">Order</Button>
                    </div>

                </Container>
            }
            {!cartData &&
                <div className="d-flex justify-content-center align-items-center cartEmpty">
                    <p className="text-danger cartText">Empty Cart</p>
                </div>}
        </div>
    )
}

export default CartComponent