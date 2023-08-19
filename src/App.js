import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  let [text, setText] = useState('')

  useEffect(() => {
    if (!localStorage.getItem("todoList")) {
      localStorage.setItem('todoList', JSON.stringify([]))
    }
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
              localStorage.setItem('todoList', JSON.stringify(todoList))
            }}>+</button>
            <div>
            <div>오늘할일 밥먹기</div>
            <div>
              <div><i class="far fa-eraser"></i></div>
            </div>
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

function Task() {
  return (
    <div>

    </div>

  )
}

export default App;
