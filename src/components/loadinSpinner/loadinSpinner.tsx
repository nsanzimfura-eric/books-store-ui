import { Spinner } from "react-bootstrap";
import styles from "./loadinSpinner.module.scss";

const LoadinSpinner: React.FC = () => {
    return (
        <div className={`${styles.loadinSpinner}`}>
            <Spinner animation="border" variant="primary" />
        </div>
    )
}

export default LoadinSpinner