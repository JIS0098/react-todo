import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { faPhone, faEnvelope, faMapMarkerAlt, faPlus } from "@fortawesome/free-solid-svg-icons";


function App() {
  let [text, setText] = useState('')
  let [task, setTask] = useState([])
  let [save ,setSave] = useState(false)
  let [user ,setUser] = useState([])
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
          <h2>My Task</h2>
          <Col className="list" lg={8}>
            <input className="add-task" onClick={(e) => {
              if (e.target.value) {
                e.target.value.innerText = ""
              }
            }} onChange={(e) => {
              setText(e.target.value)
            }} placeholder=" add task" />
            <button onClick={(e) => {
              let template = {
                taskContent: text,
                id: newID(),
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
            <div className="phone-book">
              <div  className="phone-book-header">
                <h3>연락처</h3>
                <FontAwesomeIcon onClick={()=>{
                  setSave(true);
                }} icon={faPlus}  className="fa-xl"/>
              </div>
              <div className="search">
                <input type="text" placeholder=" search user" />
              </div>
              <div className="user-list">
                <div className="user-menu">
                  <div >전체(0)</div>
                  <div>즐겨찾기(5)</div>
                </div>
                <Card />
                <Card />
                <Card />
                <Card />
              </div>
            </div>
            {
              save?
            <div className="phone-save">
              <div className="save">
                <div>
                  <div>이름</div>
                  <input type="text" placeholder="*이름을 입력해주세요." />
                </div>
                <div>
                  <div>번호</div>
                  <input type="number" placeholder="*번호를 입력해주세요." />
                </div>
                <div>
                  <div>email</div>
                  <input type="email" placeholder="메일을 입력해주세요." />
                </div>
                <div>
                  <div>소속</div>
                  <input type="text" placeholder="소속을 입력해주세요." />
                </div>
                <div className="save-but">
                  <button onClick={()=>{
              
                  }}>저장</button>
                  <button onClick={()=>{
                    setSave(false);
                  }}>닫기</button>
                </div>
              </div>
            </div>
            :""
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}



function Task({ task, setTask }) {
  let [fade, setFade] = useState('')
  let todoList = JSON.parse(localStorage.getItem('todoList'))
  let index = todoList.findIndex((a) => {
    return a.id === task.id
  })

  return (
    <div className={`task start ${task.isComplete ? "done" : ""}`}>
      <Form.Check onClick={() => {
        let copy = [...todoList]
        if (!copy[index].isComplete) {
          copy[index].isComplete = true
        } else {
          copy[index].isComplete = false
        }
        setTask([...copy])
        localStorage.setItem('todoList', JSON.stringify(copy));
      }} className="task-check" />
      <p>{task.taskContent}</p>
      <FontAwesomeIcon onClick={() => {
        todoList.splice(index, 1)
        setTask([...todoList])
        localStorage.setItem('todoList', JSON.stringify(todoList));
      }} className="delete fa-lg" icon={faEraser} />
    </div>
  )
}

function Card() {
  return (
    <div className="user">
      <h5>한지수 대리님</h5>
      <div className="line"></div>
      <div className="user-information">
        <span>
          <p><FontAwesomeIcon icon={faPhone} /> 01082112543</p>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 아이픽스</p>
        </span>
        <p><FontAwesomeIcon icon={faEnvelope} /> llqrw55@naver.com</p>
      </div>
    </div>
  )
}

export default App;
