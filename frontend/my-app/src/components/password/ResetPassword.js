import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { toast } from "react-hot-toast";
const ResetPassword = () => {
  const { token } = useParams();
  const [alertSuccess, setAlertSuccess] = useState({ msg: "", status: false });
  const [inputControl, setInputControl] = useState({
    password: "",
    confirmPassword: "",
  });
  const [inputErr, setInputErr] = useState({
    password: true,
    confirmPassword: true,
  });
  const [InValidForm, setInValidForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [focused, setFocused] = useState({
    password: false,
    confirmPassword: false,
  });
  const checkValidationForms = () => {
    let isError = false;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;

    if (
      !regex.test(inputControl.password) ||
      inputControl?.password?.length < 4
    ) {
      isError = true;
      setInValidForm((prev) => {
        return {
          ...prev,
          password: "Password is weak",
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
    if (inputControl?.password != inputControl?.confirmPassword) {
      isError = true;
      setInValidForm((prev) => {
        return {
          ...prev,
          confirmPassword: "Password is not matching",
        };
      });
    } else {
      setInValidForm((prev) => {
        return {
          ...prev,
          confirmPassword: "",
        };
      });
    }

    return isError;
  };
  const formSubmitHandler = async () => {
    setFocused({
      password: false,
      confirmPassword: false,
    });
    setInputErr({
      password: Boolean(inputControl?.password?.length),
      confirmPassword: Boolean(inputControl?.confirmPassword?.length),
    });
    const isError = checkValidationForms();
    if (isError) {
      return;
    }
    const res = await axios.post(`http://localhost:9000/resetPassword`, {
      token,
      password: inputControl?.password,
    });
    console.log({ res });
    if (res.data.success) {
      setAlertSuccess({
        status: true,
        msg: "Login with this new Password",
      });
    } else {
      console.log("error");
      toast.error("Something went wrong");
      console.log("error1");
    }
  };
  return (
    <div style={{ width: "100%" }}>
      {alertSuccess?.status && (
        <Alert
          variant="info"
          onClose={() => setAlertSuccess({ msg: "", status: false })}
          dismissible
          style={{ height: "60px" }}
        >
          <p>{alertSuccess?.msg}</p>
        </Alert>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyItems: "center",
          marginTop: "50px",
        }}
      >
        <form>
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
              value={inputControl?.password}
              onFocus={() =>
                setFocused({
                  password: true,
                  confirmPassword: false,
                })
              }
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
                  return {
                    ...prev,
                    password: Boolean(e.target.value?.length),
                  };
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
            controlId="floatingPassword"
            label="Confirm Password"
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
                  password: false,
                  confirmPassword: true,
                })
              }
              value={inputControl?.confirmPassword}
              style={{
                borderColor:
                  !inputErr?.password || InValidForm?.password
                    ? "red"
                    : "#ced4da",
                boxShadow:
                  focused?.confirmPassword &&
                  (!inputErr?.confirmPassword || InValidForm?.confirmPassword)
                    ? "0 0 0 0.2rem rgba(255, 0, 0, 0.25)"
                    : "none",
              }}
              onChange={(e) => {
                setInputControl((prev) => {
                  return { ...prev, confirmPassword: e.target.value };
                });
                setInputErr((prev) => {
                  return {
                    ...prev,
                    confirmPassword: Boolean(e.target.value?.length),
                  };
                });
              }}
            />
            {!inputErr?.confirmPassword ? (
              <Form.Text className="text-danger">
                Confirm Password is Mendatory
              </Form.Text>
            ) : InValidForm?.confirmPassword ? (
              <Form.Text className="text-danger">
                {InValidForm?.confirmPassword}
              </Form.Text>
            ) : null}
          </FloatingLabel>
        </form>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="primary"
            disabled={
              !(inputControl?.password && inputControl?.confirmPassword)
            }
            style={{ width: "200px" }}
            onClick={formSubmitHandler}
          >
            Reset Password
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
