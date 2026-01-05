import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const formSubmitHandler = async () => {
    const res = await axios.post(`http://localhost:9000/forgotPassword`, {
      email,
    });
      console.log({res})
      if (res.data.success) {
        
    } else {
     return toast.error('No Record Find! Please Signup')
    }
  };
  return (
    <div
      style={{
        marginTop: "50px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <h3 style={{ textAlign: "center" }}>Enter Your Login Email</h3>
      <div
        style={{
          marginTop: "20px",
          width: "700px",
        }}
      >
        <form autoComplete="off">
          <FloatingLabel
            controlId="emailId"
            label="Email address"
            className="mb-2"
            size="sm"
            autoComplete="new-Email"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              style={{
                width: "700",
              }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FloatingLabel>
        </form>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            disabled={!email}
            variant="primary"
            style={{ width: "200px" }}
            onClick={formSubmitHandler}
          >
            Submit Email
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
