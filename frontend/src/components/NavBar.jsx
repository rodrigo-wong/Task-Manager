import React from "react";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import AddTask from "./modals/AddTask";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavBar = ({ setReload }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate()
  const logout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      localStorage.clear();
      navigate('/');
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <AddTask setReload={setReload} />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <NavDropdown
                title={`Signed in as: ${user? user.user.name: ""}`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item>
              </NavDropdown>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
