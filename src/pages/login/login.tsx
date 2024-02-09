import Footer from "../../ui/Footer/Footer";
import { apiRoutes } from "../../utils/constants";
import styles from "./login.module.scss";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
}
    from 'mdb-react-ui-kit';

const Login = () => {

    return (
        <div className={styles.login}>
            <MDBContainer className="my-5 gradient-form">

                <MDBRow>

                    <MDBCol col='6' className="mb-5">
                        <div className="d-flex flex-column ms-5">

                            <div className="text-center">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                    style={{ width: '185px' }} alt="logo" />
                                <h4 className="mt-1 mb-5 pb-1">We are The Book Store Team</h4>
                            </div>

                            <p>Please login to your account</p>


                            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' required />
                            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' required />


                            <div className="text-center pt-1 mb-5 pb-1">
                                <button className="mb-4 w-100 btn btn-primary gradient-custom-2">Sign in</button>
                                <a className="text-muted" href="#!">Forgot password?</a>
                            </div>

                            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                <p className="mb-0">Don&apos;t have an account?</p>
                                <a href={apiRoutes.register}>
                                    <button className='mx-2 btn btn-secondary' color='primary'>
                                        Register
                                    </button>
                                </a>
                            </div>

                        </div>

                    </MDBCol>

                    <MDBCol col='6' className="mb-5">
                        <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

                            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                <h4 className="mb-4">We are more than just a company</h4>
                                <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>

                        </div>

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <Footer />
        </div>
    )
}

export default Login