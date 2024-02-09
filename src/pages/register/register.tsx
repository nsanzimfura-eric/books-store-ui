import Footer from "../../ui/Footer/Footer";
import { apiRoutes } from "../../utils/constants";
import styles from "./register.module.scss";
import { MDBContainer, MDBCol, MDBRow, MDBInput } from 'mdb-react-ui-kit';

const Register = () => {

    return (
        <div className={styles.register}>
            <MDBContainer fluid className="p-3 my-5 h-custom">

                <MDBRow>

                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                    </MDBCol>

                    <MDBCol col='4' md='6'>
                        <MDBInput wrapperClass='mb-4' label='Full Name' id='formControlLg' type='text' size="lg" />
                        <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" />
                        <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" />
                        <div className='text-center text-md-start mt-4 pt-2'>
                            <button className="mb-0 px-5 w-100 btn btn-primary">Register</button>
                            <p className="small fw-bold mt-2 pt-1 mb-2">Have an account? <a href={apiRoutes.login} className="link-danger">Login</a></p>
                        </div>

                    </MDBCol>

                </MDBRow>
            </MDBContainer>
            <Footer />
        </div>
    )
}

export default Register