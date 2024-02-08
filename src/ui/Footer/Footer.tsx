import styles from "./Footer.module.scss";
import { Container } from "react-bootstrap";

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div className={styles.footer}>
            <Container className="Footer d-flex flex-column flex-md-row py-5 justify-content-center justify-content-md-between align-items-center">
                <div>
                    <p>Copyright &copy;{year} Books Store</p>

                </div>
                <div className="medias d-flex justify-content-center justify-content-md-end">
                    <a href="https://github.com/nsanzimfura-eric" target="_blank" rel="noreferrer">
                        <img src="/images/fb.png" alt="Instagram" className="icon" />
                    </a>
                    <a href="https://github.com/nsanzimfura-eric" target="_blank" rel="noreferrer">
                        <img src="/images/yt.png" alt="Instagram" className="icon" />
                    </a>
                    <a href="https://github.com/nsanzimfura-eric" target="_blank" rel="noreferrer">
                        <img src="/images/ig.png" alt="Instagram" className="icon" />
                    </a>
                </div>
            </Container>
            <Container className="d-flex justify-content-center pb-1">
                <small className="p">Made by <a target="_blank" rel="noreferrer" href="https://github.com/nsanzimfura-eric" className="mx-1">🌸Nsanzimfura Eric</a></small>
            </Container>
        </div>
    )
}

export default Footer