import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const Signup = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '50px' }}>
            <div>
                <form autoComplete="off">
                    <FloatingLabel
                        controlId="nameId"
                        label="Name"
                        className="mb-2"
                        size="sm"
                        style={{ width: '700px' }}
                    >
                        <Form.Control type="text" placeholder="Ritu" />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="emailId"
                        label="Email address"
                        className="mb-2"
                        size="sm"
                        style={{ width: '700px' }}
                        autoComplete="new-Email"

                    >
                        <Form.Control type="email" placeholder="name@example.com" />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-2" size="sm"
                        style={{ width: '700px' }}
                    >
                        <Form.Control autoComplete="new-password" type="password" placeholder="Password" />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="contactId"
                        label="Contact No"
                        className="mb-2"
                        size="sm"
                        style={{ width: '700px' }}

                    >
                        <Form.Control type="text" placeholder="9877..." />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </FloatingLabel>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="primary" style={{ width: '200px' }}>Sign Up</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
