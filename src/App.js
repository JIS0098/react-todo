import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  let [text, setText] = useState('')
  let [task, setTask] = useState([])

  useEffect(() => {
    if (!localStorage.getItem("todoList")) {
      localStorage.setItem('todoList', JSON.stringify([]))
    }

    let todoList = JSON.parse(localStorage.getItem('todoList'))
    setTask([...todoList])

  }, [])

  return (
    <div className="App">
      <Container>
        <Row>
          <h1>ToDo</h1>
          <Col className="list" lg={9}>
            <input onChange={(e) => { setText(e.target.value) }} placeholder=" Add Task" />
            <button onClick={() => {
              let todoList = JSON.parse(localStorage.getItem('todoList'))
              todoList.push(text);
              setTask([...todoList])
              localStorage.setItem('todoList', JSON.stringify(todoList))
            }}>+</button>
            <div className="taskList">
              {
                task.map((a) => {
                  return <Task task={a} />
                })
              }
            </div>
          </Col>
          <Col className="number" lg={3}>
            <div>폰저장</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function Task({ task }) {
  return (
    <div>
      <div>{task}</div>
      <div>
        <div>버튼자리</div>
      </div>
    </div>

  )
}

export default App;
