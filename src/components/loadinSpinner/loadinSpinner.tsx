import styles from "./loadinSpinner.module.scss";

const LoadinSpinner: React.FC = () => {
    return (
        <div className={`${styles.loadinSpinner}`}>
            <img
                src='/images/spinner.gif'
                className="player"
                style={{ height: '100px', width: '100%' }}
            />
        </div>
    )
}

export default LoadinSpinner