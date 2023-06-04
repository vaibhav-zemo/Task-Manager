import "./App.css";
import React, { useState, useEffect } from "react";
import { publicRequest } from "./requestMethod";
import {
  Form,
  Button,
  Card,
  Navbar,
  Container,
  Row,
  Col,
} from "bootstrap-4-react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await publicRequest.get("/api/tasks/");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async () => {
    try {
      const response = await publicRequest.post("/api/tasks/", {
        title,
        description,
        status: "pending",
      });
      setTasks([...tasks, response.data]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await publicRequest.put(`/api/tasks/${taskId}`, {
        status,
      });
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? response.data : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await publicRequest.delete(`/api/tasks/${taskId}`);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar
        light
        bg="light"
        sticky="top"
        mb="3"
        display="flex"
        style={{ justifyContent: "center" }}
      >
        <Navbar.Brand href="#">Task Management Application</Navbar.Brand>
      </Navbar>
      <Container>
        <Form onSubmit={addTask}>
          <Form.Group>
            <label htmlFor="exampleInput">Title</label>
            <Form.Input
              id="exampleInput"
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <label htmlFor="exampleControlsTextarea1">Description</label>
            <Form.Textarea
              id="exampleControlsTextarea1"
              rows="3"
              mb="3"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Textarea>
            <Button primary type="submit">
              Add Task
            </Button>
          </Form.Group>
        </Form>

        <Row mb="3">
          {tasks.map((task) => (
            <Col col="sm" mt="3">
              <Card key={task._id} style={{ width: "21rem" }}>
                <Card.Body>
                  <Card.Title>{task.title}</Card.Title>
                  <Card.Subtitle mb="2" text="muted">
                    Status: {task.status}
                  </Card.Subtitle>
                  <Card.Text>{task.description}</Card.Text>
                  <Button
                    mr="2"
                    // mb="2"
                    primary
                    onClick={() => updateTaskStatus(task._id, "completed")}
                  >
                    Mark as Completed
                  </Button>
                  <Button primary onClick={() => deleteTask(task._id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
