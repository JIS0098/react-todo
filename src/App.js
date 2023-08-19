import { Col, Container, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  let [text , setText]= useState('')

  useEffect(()=>{
    if (!localStorage.getItem("todoList")){
      localStorage.setItem('todoList',JSON.stringify([]))
    }
  },[])

  return (
    <div className="App">
      <Container>
        <Row>
          <h1>ToDo</h1>
          <Col className="list" lg={9}>
            <input onChange={(e)=>{
              setText(e.target.value)
            }} placeholder="+Add Task"/>
            <button onClick={()=>{
              let todoList =JSON.parse(localStorage.getItem('todoList'))
              todoList.push(text);
              localStorage.setItem('todoList',JSON.stringify(todoList))
            }}>+</button>
            <div>오늘의 할일은 밥먹기</div>
          </Col>
          <Col className="number" lg={3}>
            <div>폰저장</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function Task(){
  return(
    <div>

    </div>

  )
}

export default App;
