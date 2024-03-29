import { Container, Nav, Navbar } from 'react-bootstrap';
import styles from "./Navbar.module.scss";
import Headroom from "react-headroom";
import { useEffect, useState } from 'react';
import { apiRoutes } from '../../utils/constants';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { CartInterface, UserInterface } from '../../utils/interfaces';


const NavbarComponent = () => {
    const [scrolled, setScrolled] = useState(false);
    const [cartDatas, setCartDatas] = useState<CartInterface[] | []>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<UserInterface | null>(null);
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path ? "active" : "";
    const cartData = useSelector((state: RootState) => state.cartReducer.cart);


    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    useEffect(() => {
        const user: UserInterface = JSON.parse(localStorage.getItem("user")!);
        if (user) {
            setIsLoggedIn(user)
        }
        const LSCart: CartInterface[] = JSON.parse(localStorage.getItem("cart")!);
        setCartDatas(LSCart)
    }, [])

    useEffect(() => {
        const LSCart: CartInterface[] = JSON.parse(localStorage.getItem("cart")!);
        setCartDatas(LSCart)
    }, [cartData])

    return (
        <Headroom className={styles.navbar}>
            <Navbar expand="lg" className={`navbarWrapper py-4 ${scrolled ? "scrollingDown" : ""}`}>
                <Container className='bg-none'>
                    <Navbar.Brand href={apiRoutes.home} className='brand' ><img src="/images/logo.jpg" alt="Logo" width={100} height={100} /></Navbar.Brand>
                    <h1 className='d-none d-lg-flex'>Books store</h1>
                    <h1 className='d-flex d-lg-none'> <a href={apiRoutes.cart}>Cart <small>{cartDatas?.length || 0}</small></a></h1>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto navLinksWrapper">
                            <a href={apiRoutes.cart} className={`links ${isActive(apiRoutes.cart)} d-none d-lg-flex me-5`}><h2 className='d-flex align-items-center'>Cart <small>{cartDatas?.length || 0}</small></h2></a>
                            {isLoggedIn &&
                                <>
                                    <p className='links me-0 me-lg-2'>
                                        {isLoggedIn.full_name}
                                    </p>
                                    <p className='links ms-0 ms-lg-2'>
                                        Points: <strong className='ms-1  text-bg-info'>{isLoggedIn.points}</strong>
                                    </p>
                                </>
                            }
                            {!isLoggedIn &&
                                <>
                                    <a href={apiRoutes.login} className={`links ${isActive(apiRoutes.login)} me-0 me-lg-3 `}>Login</a>
                                    <a href={apiRoutes.register} className={`links ${isActive(apiRoutes.register)} register`}>Register</a>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Headroom>
    )
}

export default NavbarComponent