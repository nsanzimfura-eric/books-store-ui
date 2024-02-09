/* eslint-disable */
import { useState } from "react";
import Footer from "../../ui/Footer/Footer";
import { apiRoutes, backendAPi } from "../../utils/constants";
import styles from "./register.module.scss";
import { MDBContainer, MDBCol, MDBRow, MDBInput } from 'mdb-react-ui-kit';
import usePostData from "../../hooks/usePostData";
import LoadinSpinner from "../../components/loadinSpinner/loadinSpinner";
import { Badge, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({ email: "", password: "", full_name: "" });
    const navigate = useNavigate()


    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    }

    const { data, loading, error, handler } = usePostData()

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (formData.email && formData.full_name && formData.password) {
            const data = {
                url: backendAPi.signUp, body: formData
            }
            void handler(data)
            // clean form
            localStorage.setItem('formData', JSON.stringify(formData));
            setFormData({ email: "", password: "", full_name: "" });
            // redirect to login
            navigate(apiRoutes.login)

        } else {
            alert("Please Fill all field")
        }

    }
    return (
        <div className={styles.register}>
            <MDBContainer fluid className="p-3 my-5 h-custom">
                {error && !loading && !data &&
                    <Stack direction="horizontal">
                        <Badge bg="danger">{error?.message}</Badge>
                    </Stack>
                }
                <MDBRow>
                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                    </MDBCol>
                    <MDBCol col='4' md='6'>
                        {!loading && !data && <>
                            <MDBInput wrapperClass='mb-4' value={formData.full_name} label='Full Name' id='full_name' type='text' size="lg" required onChange={(e) => handleChange("full_name", e.target.value)} />
                            <MDBInput wrapperClass='mb-4' value={formData.email} label='Email address' id='email' type='email' size="lg" required onChange={(e) => handleChange("email", e.target.value)} />
                            <MDBInput wrapperClass='mb-4' value={formData.password} label='Password' id='password' type='password' size="lg" required onChange={(e) => handleChange("password", e.target.value)} />
                            <div className='text-center text-md-start mt-4 pt-2'>
                                <button className="mb-0 px-5 w-100 btn btn-primary" type="submit" onClick={handleSubmit}>Register</button>
                                <p className="small fw-bold mt-2 pt-1 mb-2">Have an account? <a href={apiRoutes.login} className="link-danger">Login</a></p>
                            </div>
                        </>}
                        {loading && <LoadinSpinner />}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <Footer />
        </div >
    )
}

export default Register