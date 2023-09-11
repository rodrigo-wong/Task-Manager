import React from "react";
import { useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import axios from "axios";

const EditTask = ({task,setReload}) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    try {
        let token = JSON.parse(localStorage.getItem("userInfo")).token;
      await axios
        .patch(
          `${process.env.REACT_APP_API_URL}/api/task/${task.id}`,
          {
            name: name,
            description: description,
            priority: priority,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => setReload(true));
        handleClose();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <tr key={task.id}>
                  <td>
                    <input
                      value={name}
                      type="text"
                      id="name"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={description}
                      type="text"
                      id="description"
                      name="description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={priority}
                      type="text"
                      id="priority"
                      name="priority"
                      onChange={(e) => setPriority(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTask;
