import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/api/login`, {
          email: email,
          password: password,
        })
        .then((res) => {
          const data = JSON.stringify(res.data);
          localStorage.setItem("userInfo", data);
        });
      navigate("/tasks");
    } catch (err) {
      toast.error("Credentials do not match");
      console.log(err.message);
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="BasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={email}
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="BasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Container className="text-center" >
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Container>
      <ToastContainer position="bottom-center" />
    </Form>
  );
};

export default Login;
