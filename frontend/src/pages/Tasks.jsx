import React from "react";
import { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import axios from "axios";
import NavBar from "../components/NavBar";
import EditTask from "../components/modals/EditTask";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = useState();
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const handleDelete = async (task) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/task/${task.id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setReload(true);
  };

  useEffect(() => {
    if(!user){
      navigate('/');
      return;
    }
    axios(`${process.env.REACT_APP_API_URL}/api/task`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then((res) => setTasks(res.data.tasks));
    setReload(false);
  }, [reload]);

  return (
    <>
      <NavBar setReload={setReload} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tasks ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.priority}</td>
                <td>
                  <EditTask setReload={setReload} task={task} />
                  <Button
                    onClick={() => handleDelete(task)}
                    className="ms-2"
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Tasks;
