import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faL } from "@fortawesome/free-solid-svg-icons";
import { faPhone, faEnvelope, faMapMarkerAlt, faPlus ,faHeart } from "@fortawesome/free-solid-svg-icons";


function App() {
  var newID = function () { return Math.random().toString(36).substr(2, 16); }
  let [text, setText] = useState('')
  let [task, setTask] = useState([])
  let [save, setSave] = useState(false)
  let [userList, setUserList] = useState([])
  let [inputs, setInputs] = useState({
    name: '',
    tel: '',
    email: '',
    company: '',
    favorite:false
  });
  let [favorite, setFavorite] =useState(false);
  let [saveOn, setSaveOn] =useState(false)
  let { name, tel, email, company } = inputs;

  let onChange = (e) => {
    let { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });

  };
    let count = 0
    userList.map((a)=>{
    if(a.favorite){count++}
  })

  const onReset = () => {
    setUserList(inputs)
    let userList = JSON.parse(localStorage.getItem('userList'))
    let copy = [...userList]
    copy.push(inputs)
    setUserList([...copy])
    localStorage.setItem('userList', JSON.stringify(copy));
    setInputs({
      name: '',
      tel: '',
      email: '',
      company: '',
    });
    console.log(userList)
  };



  useEffect(() => {
    if (!localStorage.getItem("todoList")) {
      localStorage.setItem('todoList', JSON.stringify([]))
    }

    if (!localStorage.getItem("userList")) {
      localStorage.setItem('userList', JSON.stringify([]))
    }

    let todoList = JSON.parse(localStorage.getItem('todoList'))
    setTask([...todoList])
    let userList = JSON.parse(localStorage.getItem('userList'))
    setUserList([...userList])


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
              <div className="phone-book-header">
                <h3>연락처</h3>
                <FontAwesomeIcon onClick={() => {
                  setSave(true);
                  setSaveOn(true)
                }} icon={faPlus} className="fa-xl" />
              </div>
              <div className="search">
                <input type="text" placeholder=" search user" />
              </div>
              <div className="user-list">
                <div className="user-menu">
                  <div onClick={()=>{
                    setFavorite(false)
                  }} >전체({userList.length})</div>
                  <div onClick={()=>{
                   setFavorite(true);
                  }}>즐겨찾기({count})</div>
                </div>
                <div className="card-list">
                { 
                  favorite===false?
                  userList.map((a)=>{
                    return(
                      <Card user={a}  setUserList={setUserList}/>
                    )
                  })
                  : userList.map((a)=>{
                    return(
                     a.favorite?
                      <Card user={a}  setUserList={setUserList}/>
                      :""
                    )                    
                  })
                  }
                </div>
                
              </div>
            </div>
                <div className={`phone-save ${saveOn? 'down':''}`}>
                  <div className="save">
                    <div>
                      <div>이름</div>
                      <input name="name" onChange={onChange} value={name} type="text" placeholder="*이름을 입력해주세요." />
                    </div>
                    <div>
                      <div>번호</div>
                      <input name="tel" onChange={onChange} value={tel} type="number" placeholder="*번호를 입력해주세요." />
                    </div>
                    <div>
                      <div>email</div>
                      <input name="email" onChange={onChange} value={email} type="email" placeholder="메일을 입력해주세요." />
                    </div>
                    <div>
                      <div>소속</div>
                      <input name="company" onChange={onChange} value={company} type="text" placeholder="소속을 입력해주세요." />
                    </div>
                    <div className="save-but">
                      <button onClick={()=>{
                        setSaveOn(false);
                        onReset();
                      }}>저장</button>
                      <button onClick={() => {
                        setSave(false);
                        setSaveOn(false);
                      }}>닫기</button>
                    </div>
                  </div>
                </div>
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
        copy[index].isComplete == false?
        copy[index].isComplete = true:copy[index].isComplete = false
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



function Card({user,setUserList}) {
  let userList = JSON.parse(localStorage.getItem('userList'))
  let index = userList.findIndex((a) => {
    return a.tel == user.tel
  })
  return (
    <div className="user">
      <div className="user-header">
      <h5>{user.name}</h5>
      <FontAwesomeIcon onClick={()=>{
        let copy = [...userList]
        copy[index].favorite ==false?
        copy[index].favorite=true:copy[index].favorite=false
        setUserList(copy)
        localStorage.setItem('userList', JSON.stringify(copy));
      }} icon={faHeart} className={`heart ${user.favorite ? "favorite" : ""}`}/>
      </div>
      <div className="line"></div>
      <div className="user-information">
        <span>
          <p><FontAwesomeIcon icon={faPhone} /> {user.tel}</p>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {user.company}</p>
        </span>
        <p><FontAwesomeIcon icon={faEnvelope} /> {user.email}</p>
      </div>
    </div>
  )
}



export default App;
