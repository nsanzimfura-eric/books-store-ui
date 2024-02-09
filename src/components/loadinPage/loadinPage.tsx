import { Spinner } from "react-bootstrap";
import styles from "./loadinPage.module.scss";

const LoadingPage: React.FC = () => {
    return (
        <div className={`${styles.loadingPage}`}>
            ...<Spinner animation="grow" variant="primary" className="mx-2" />...
        </div>
    )
}

export default LoadingPage