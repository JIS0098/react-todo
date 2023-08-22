import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";


function App() {
  let [text, setText] = useState('')
  let [task, setTask] = useState([])
  var newID = function () {
  return Math.random().toString(36).substr(2, 16);
}
 
  
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
          <Col className="list" lg={8}>
            <input onChange={(e) => { 
              setText(e.target.value) }} placeholder=" Add Task" />
            <button onClick={() => {
              let template = {
                taskContent:text,
                id:newID(),
                isComplete: false,
              }
              let todoList = JSON.parse(localStorage.getItem('todoList'))
              todoList.push(template);
              setTask([...todoList])
              localStorage.setItem('todoList', JSON.stringify(todoList))
            }}>+</button>
            <div className="taskList">
              {
                task.map((a) => {
                  return <Task task={a} setTask={setTask} />
                })
              }
            </div>
          </Col>
          <Col className="number" lg={4}>
            <div className="number-background phone-book">연락처</div>
            <div className="number-background phone-save">폰저장</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}



function Task({ task,setTask }) {
  let [fade, setFade] = useState('')
  let todoList = JSON.parse(localStorage.getItem('todoList'))
  let index = todoList.findIndex((a)=>{
    return a.id === task.id
  })

  // useEffect(()=>{
  //   setTimeout(()=>{ setFade('end') }, 100)
  //   return ()=>{
  //     setFade('')
  //   }
  // }, [task.isComplete])

  return (
    <div className={`task start ${task.isComplete? "done":""}`}>
      <Form.Check onClick={()=>{
        let copy = [...todoList]
        if(!copy[index].isComplete){
          copy[index].isComplete=true
        }else{
          copy[index].isComplete=false
        }
        setTask([...copy])
        if(task.isComplete){
          
        }
        localStorage.setItem('todoList', JSON.stringify(copy));
      }} className="task-check"/>
      <p>{task.taskContent}</p>
      <FontAwesomeIcon onClick={()=>{
        todoList.splice(index,1)
        setTask([...todoList])
        localStorage.setItem('todoList', JSON.stringify(todoList));
      }} className="delete fa-lg" icon={faEraser} />
    </div>
  )
}

export default App;
