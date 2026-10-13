import { useState } from 'react';
import './App.css'

function App() {
  const [profiles, setProfiles] = useState([
    {"key": "p1", "name": "Moon SooBin", "age": 30, "job": "Developer", "isAdmin": true},
    {"key": "p2", "name": "Moon SooBang", "age": 31, "job": "FireFighter", "isAdmin": false},
    {"key": "p3", "name": "Moon SooB", "age": 32, "job": "Teacher", "isAdmin": false}
  ]);
  const [adminFilterFlag, setAdminFilterFlag] = useState(false);
  
  return (
    <div className="wrapper">
      <Header />
      <Greeting />
      <button className="btn-style btn-filter" onClick={() => setAdminFilterFlag(!adminFilterFlag)}>{adminFilterFlag ? "전체보기" : "관리자만 보기"}</button>
      { 
        adminFilterFlag ? 
        profiles.filter((p) => p.isAdmin).map(p => (
          <Profile key={p.key} name={p.name} age={p.age} job={p.job} isAdmin={p.isAdmin}/>
        ))
        :
        profiles.map(p => <Profile key={p.key} name={p.name} age={p.age} job={p.job} isAdmin={p.isAdmin}/>)
      }
      <hr/>
      <ToDoManagement />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>React Study SPA</h1>
    </header>
  );
}

function Greeting() {
  const [name, setName] = useState("");
  return (
    <section>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
      <h3>{name === "" ? "이름을 입력해주세요." : `안녕하세요, ${name}님!`}</h3>
    </section>
  );
}

function Profile({ name, age, job, isAdmin }) {
  return (
    <section className="profile-section">
      <ul className="profile-section-list">
        <li>Name : {isAdmin && "(관리자)"} {name}</li>
        <li>Age : {age}</li>
        <li>Job : {job}</li>
      </ul>
      <Counter label="좋아요" />
    </section>
  );
}

function Footer() {
  const dateObj = new Date();
  const today = `${dateObj.getFullYear()}.${(dateObj.getMonth() + 1)}.${dateObj.getDate()}`;
  return (
    <footer className="footer">
      {today}
    </footer>
  );
}

function Counter({label}) {
  const [count, setCount] = useState(0);
  
  return (
    <section>
      <h5>{label}: {count}</h5>
      <div className="counter-button-section">
        <button className="counter-btn-style" onClick={() => setCount(prev => prev + 1)}>+1</button>
        <button className="counter-btn-style" onClick={() => { setCount(prev => prev + 1); setCount(prev => prev + 1);}}>+2</button>
        <button className="counter-btn-style" onClick={() => setCount(prev => prev - 1)} disabled={count === 0}>-1</button>
        <button className="counter-btn-style" onClick={() => setCount(0)}>초기화</button>
      </div>
    </section>
  );
}

function ToDoManagement() {
  const [inputToDo, setInputToDo] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [disabled, setDisabled] = useState(true);
  
  function handleDelete(id) {
    setToDoList((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <div className="section-ToDoManagement">
      <input name="input-todo" value={inputToDo} onChange={(e) => {
        setInputToDo(e.target.value);
        if(e.target.value.trim() !== ""){
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      }} />
      <button onClick={() => { 
        setToDoList((prev) => [...prev, {"id": Date.now(), "text": inputToDo}]);
        setInputToDo("");
      }} disabled={disabled}>추가</button>
      <div className="section-toDoList">
        { 
        toDoList.length === 0 ?
        "할 일이 없습니다."
        :
        toDoList.map((todo) => <Todo key={todo.id} id={todo.id} text={todo.text} onDelete={handleDelete}/>)
        }
      </div>
    </div>
  );
}

function Todo({text, id, onDelete}) {
  return (
    <div className="item-todo">
      <span>{text}</span>
      <button className="btn-delete" onClick={() => onDelete(id)}>삭제</button>
    </div>
  );
}

export default App;