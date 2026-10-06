import { useState } from 'react';
import './App.css'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Greeting />
      <Profile name="Moon SooBin" age={30} job="Developer" isAdmin/>
      <Profile name="Moon SooBang" age={31} job="FireFighter" />
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
        <li>Name : {isAdmin ? "(관리자)" : ""} {name}</li>
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

export default App;