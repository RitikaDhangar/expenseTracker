import { useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import axios from 'axios';
const Login = () => {
    const [inputControl, setInputControl] = useState({
        email: "",
        password: "",
    });
    const [inputErr, setInputErr] = useState({
        email: true,
        password: true,
    });
    const [focused, setFocused] = useState({
        email: false,
        password: false,
    });
    const formSubmitHandler = async() => {
        setInputErr({
            email: Boolean(inputControl?.email?.length),
            password: Boolean(inputControl?.password?.length),
        });
        setFocused({
            email: false,
            password: false,
        });
        const { email, password } = inputControl;
    }
    return (
        <>
            <h2 style={{ textAlign: "center", marginTop: "40px" }}>User Login</h2>
            <div style={{
                display: 'flex', justifyContent: "center",
                alignContent: "center",
                marginTop: "20px",
            }}>
                <form autoComplete="off">
                    <FloatingLabel
                        controlId="emailId"
                        label="Email address"
                        className="mb-2"
                        size="sm"
                        style={{
                            width: "700",
                        }}
                        autoComplete="new-Email"
                    >
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            onFocus={() =>
                                setFocused({
                                    email: true,
                                    password: false,
                                })
                            }
                            value={inputControl?.email}
                            style={{
                                borderColor:
                                    !inputErr?.email ? "red" : "#ced4da",
                                boxShadow:
                                    focused?.email && (!inputErr?.email)
                                        ? "0 0 0 0.2rem rgba(255, 0, 0, 0.25)"
                                        : "none",
                            }}
                            onChange={(e) => {
                                setInputControl((prev) => {
                                    return { ...prev, email: e.target.value };
                                });
                                setInputErr((prev) => {
                                    return { ...prev, email: Boolean(e.target.value?.length) };
                                });
                            }}
                        />
                        {!inputErr?.email ? (
                            <Form.Text className="text-danger">
                                User Email is Mendatory
                            </Form.Text>
                        ) : null}
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingPassword"
                        label="Password"
                        className="mb-2"
                        size="sm"
                        style={{ width: "700px" }}
                    >
                        <Form.Control
                            autoComplete="new-password"
                            type="password"
                            placeholder="Password"
                            onFocus={() =>
                                setFocused({
                                    email: false,
                                    password: true,
                                })
                            }
                            value={inputControl?.password}
                            style={{
                                borderColor:
                                    !inputErr?.password
                                        ? "red"
                                        : "#ced4da",
                                boxShadow:
                                    focused?.password &&
                                        (!inputErr?.password)
                                        ? "0 0 0 0.2rem rgba(255, 0, 0, 0.25)"
                                        : "none",
                            }}
                            onChange={(e) => {
                                setInputControl((prev) => {
                                    return { ...prev, password: e.target.value };
                                });
                                setInputErr((prev) => {
                                    return { ...prev, password: Boolean(e.target.value?.length) };
                                });
                            }}
                        />
                        {!inputErr?.password ? (
                            <Form.Text className="text-danger">
                                User Password is Mendatory
                            </Form.Text>
                        ) : null}
                    </FloatingLabel>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="primary"
                            style={{ width: "200px" }}
                            onClick={formSubmitHandler}
                        >
                            Log In
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Login;