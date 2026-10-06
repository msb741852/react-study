import { useState } from 'react';
import './App.css'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Profile name="Moon SooBin" age={30} job="Developer" isAdmin/>
      <Profile name="Moon SooBang" age={31} job="FireFighter" />
      <Footer />
    </div>
  );
}

function Header() {
  const [text, setText] = useState("");
  return (
    <header className="header">
      <input type="text" onChange={(e) => setText(e.target.value)}/>
      <h3>{text == "" ? "이름을 입력해주세요." : "안녕하세요, " + text +"님!"}</h3>
      <h1>React Study SPA</h1>
    </header>
  );
}

function Profile({ name, age, job, isAdmin }) {
  return (
    <section className="profile-section">
      <ul className="list">
        <li>Name : {isAdmin ? "(관리자)" : ""} {name}</li>
        <li>Age : {age}</li>
        <li>Job : {job}</li>
      </ul>
      <Counter />
    </section>
  );
}

function Footer() {
  const dateObj = new Date();
  const today = dateObj.getFullYear() + "." + (dateObj.getMonth() + 1)  + "." + dateObj.getDate();
  return (
    <footer className='footer'>
      {today}
    </footer>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <section className="counter-section">
      <h5>좋아요: {count}</h5>
      <div className="button-section">
        <button className="btn-style btn-plus" onClick={() => setCount(count + 1)}>+1</button>
        <button className="btn-style btn-plus" onClick={() => setCount(count + 1)}>+2</button>
        <button className="btn-style btn-minus" onClick={() => count <= 0 ? "" : setCount(count - 1)}>-1</button>
        <button className="btn-style btn-reset" onClick={() => setCount(0)}>초기화</button>
      </div>
    </section>
  );
}

export default App;