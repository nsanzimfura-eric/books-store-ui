import styles from "./loadinPage.module.scss";

const LoadingPage: React.FC = () => {
    return (
        <div className={`${styles.loadingPage}`}>
            <img
                src='/images/bookgif.gif'
                className="player"
                style={{ height: '300px', width: '300px' }}
            />
        </div>
    )
}

export default LoadingPage