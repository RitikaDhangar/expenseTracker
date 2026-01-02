import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import toast from 'react-hot-toast'
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

  const [inputControl, setInputControl] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    password: false,
    phone: false,
  });
  const [inputErr, setInputErr] = useState({
    name: true,
    email: true,
    password: true,
    phone: true,
  });
  const [InValidForm, setInValidForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [alertErr, setAlertErr] = useState({ status: false, msg: '' });
  const [submitForm, setSubmitForm] = useState(false);
  const navigate = useNavigate();
  console.log({ alertErr });

  const formSubmitHandler = async () => {
    setInputErr({
      name: Boolean(inputControl?.name?.length),
      email: Boolean(inputControl?.email?.length),
      password: Boolean(inputControl?.password?.length),
      phone: Boolean(inputControl?.phone?.length),
    });
    setFocused({
      email: false,
      password: false,
      phone: false,
      name: false,
    });
    setSubmitForm(true);

    const { name, email, password, phone } = inputControl;
    const res = await axios.post(`http://localhost:3000/createUser`, {
      name,
      email:email?.toLowerCase(),
      password,
      phone
    })
    console.log(res)
    if (res.data.success) {
      return toast.success('User Created successfully');
    } else {
      setAlertErr({ status: true, msg: res?.data?.message });
    }
  };
  const navigateLogin = () => {
    navigate('/login')
  }
  const checkValidationForms = () => {
    if (
      inputErr?.name ||
      inputErr?.email ||
      inputErr?.password ||
      inputErr?.phone
    ) {
      if (inputControl?.name?.length < 3) {
        setInValidForm((prev) => {
          return {
            ...prev,
            name: "Username is not Valid",
          };
        });
      } else {
        setInValidForm((prev) => {
          return {
            ...prev,
            name: "",
          };
        });
      }
      if (
        inputControl?.email?.length < 5 ||
        !inputControl?.email.includes('@')
      ) {
        setInValidForm((prev) => {
          return {
            ...prev,
            email: "Useremail is not Valid",
          };
        });
      } else {
        setInValidForm((prev) => {
          return {
            ...prev,
            email: "",
          };
        });
      }
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;

      if (
        !regex.test(inputControl.password) ||
        inputControl?.password?.length < 4
      ) {
        setInValidForm((prev) => {
          return {
            ...prev,
            password: "Password is week",
          };
        });
      } else {
        setInValidForm((prev) => {
          return {
            ...prev,
            password: "",
          };
        });
      }

      if (inputControl?.phone?.length < 10) {
        return setInValidForm((prev) => {
          return {
            ...prev,
            phone: "Phone No is not Valid",
          };
        });
      } else {
        setInValidForm((prev) => {
          return {
            ...prev,
            phone: "",
          };
        });
      }
    }
  };

  useEffect(() => {
    if (submitForm) {
      checkValidationForms();
    }
  }, [submitForm, inputControl]);
  return (
    <>
      {alertErr?.status && <Alert variant="danger" onClose={() => setAlertErr({ msg: '', status: false })} dismissible style={{ height: "60px" }}>
        <p>
          {alertErr?.msg}
        </p>
      </Alert>}
      <h2 style={{textAlign:"center",marginTop:"40px"}}>User Signup</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginTop: "20px",
        }}
      >
        <div>
          <form autoComplete="off">
            <FloatingLabel
              controlId="nameId"
              label="Name"
              className="mb-2"
              size="sm"
            >
              <Form.Control
                type="text"
                onFocus={() =>
                  setFocused({
                    email: false,
                    password: false,
                    phone: false,
                    name: true,
                  })
                }
                placeholder="Ritu"
                value={inputControl?.name}
                onChange={(e) => {
                  setInputControl((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                  setInputErr((prev) => {
                    return { ...prev, name: Boolean(e.target.value?.length) };
                  });
                }}
                style={{
                  borderColor:
                    !inputErr?.name || InValidForm?.name ? "red" : "#ced4da",
                  boxShadow:
                    focused?.name && (!inputErr?.name || InValidForm?.name)
                      ? "0 0 0 0.2rem rgba(255, 0, 0, 0.25)"
                      : "none",
                }}
              />
              {!inputErr?.name ? (
                <Form.Text className="text-danger">
                  User name is Mendatory
                </Form.Text>
              ) : InValidForm?.name ? (
                <Form.Text className="text-danger">{InValidForm?.name}</Form.Text>
              ) : null}
            </FloatingLabel>
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
                    phone: false,
                    name: false,
                  })
                }
                value={inputControl?.email}
                style={{
                  borderColor:
                    !inputErr?.email || InValidForm?.email ? "red" : "#ced4da",
                  boxShadow:
                    focused?.email && (!inputErr?.email || InValidForm?.email)
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
              ) : InValidForm?.email ? (
                <Form.Text className="text-danger">
                  {InValidForm?.email}
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
                    phone: false,
                    name: false,
                  })
                }
                value={inputControl?.password}
                style={{
                  borderColor:
                    !inputErr?.password || InValidForm?.password
                      ? "red"
                      : "#ced4da",
                  boxShadow:
                    focused?.password &&
                      (!inputErr?.password || InValidForm?.password)
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
              ) : InValidForm?.password ? (
                <Form.Text className="text-danger">
                  {InValidForm?.password}
                </Form.Text>
              ) : null}
            </FloatingLabel>
            <FloatingLabel
              controlId="contactId"
              label="Contact No"
              className="mb-2"
              size="sm"
              style={{ width: "700px" }}
            >
              <Form.Control
                type="text"
                placeholder="9877..."
                onFocus={() =>
                  setFocused({
                    email: false,
                    password: false,
                    phone: true,
                    name: false,
                  })
                }
                value={inputControl?.phone}
                style={{
                  borderColor:
                    !inputErr?.phone || InValidForm?.phone ? "red" : "#ced4da",
                  boxShadow:
                    focused?.phone && (!inputErr?.phone || InValidForm?.phone)
                      ? "0 0 0 0.2rem rgba(255, 0, 0, 0.25)"
                      : "none",
                }}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) {
                    setInputControl((prev) => {
                      return { ...prev, phone: e.target.value };
                    });
                    setInputErr((prev) => {
                      return { ...prev, phone: Boolean(e.target.value?.length) };
                    });
                  }
                }}
              />
              {!inputErr?.phone ? (
                <Form.Text className="text-danger">
                  User Contact is Mendatory
                </Form.Text>
              ) : InValidForm?.phone ? (
                <Form.Text className="text-danger">
                  {InValidForm?.phone}
                </Form.Text>
              ) : null}
              <br />
            </FloatingLabel>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="primary"
                style={{ width: "200px" }}
                onClick={formSubmitHandler}
              >
                Sign Up
              </Button>
            </div>
          </form>
        </div>

      </div>
      <div style={{ textAlign: 'center', marginTop: '5px' }}>
        <p onClick={navigateLogin} style={{cursor:'pointer',color:'red'}} > Already a User?
          login</p>

      </div>
    </>
  );
};

export default Signup;
