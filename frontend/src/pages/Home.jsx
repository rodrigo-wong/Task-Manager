import React from "react";
import { useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Home = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('userInfo')){
      navigate('/tasks');
    }
  },[])

  return (
    <>
      <Container className="mt-5 w-50">
      <p className="text-center fs-3"><strong>Task-Manager</strong></p>
        <Tabs
          defaultActiveKey="signup"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="signup" title="Sing up">
            <Signup />
          </Tab>
          <Tab eventKey="login" title="Log in">
            <Login />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default Home;
