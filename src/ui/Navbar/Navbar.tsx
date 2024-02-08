import { Container, Nav, Navbar } from 'react-bootstrap';
import styles from "./Navbar.module.scss";
import Headroom from "react-headroom";
import { useEffect, useState } from 'react';
import { apiRoutes } from '../../utils/constants';
import { useLocation } from 'react-router-dom';


const NavbarComponent = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path ? "active" : "";

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


    return (
        <Headroom className={styles.navbar}>
            <Navbar expand="lg" className={`navbarWrapper py-4 ${scrolled ? "scrollingDown" : ""}`}>
                <Container className='bg-none'>
                    <Navbar.Brand href={apiRoutes.home} className='brand' ><img src="/images/logo.jpg" alt="Logo" width={100} height={100} /></Navbar.Brand>
                    <h1 className='d-none d-lg-flex'>Books store</h1>
                    <h1 className='d-flex d-lg-none'>Cart <small>0</small></h1>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto navLinksWrapper">
                            <a href={apiRoutes.cart} className={`links ${isActive(apiRoutes.cart)} d-none d-lg-flex`}><h2>Cart <small>0</small></h2></a>
                            <a href='#' className='d-flex w-100 justify-content-center links d-lg-none active'>home</a>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Headroom>
    )
}

export default NavbarComponent