import React,{useState} from 'react';
import {Button, Modal, Table} from 'react-bootstrap';
import axios from 'axios';

const AddTask = ({setReload}) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("userInfo")).token;
          await axios
            .post(
              `${process.env.REACT_APP_API_URL}/api/task`,
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
            );
            setReload(true);
            setName(""); setDescription(""); setPriority("");
            handleClose();
        } catch (err) {
          console.log(err.message);
        }
      };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add Task +
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
                <tr>
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
          <Button variant="primary" onClick={handleSubmit} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTask