import './App.css'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Profile name="Moon SooBin" age="30" job="Developer" isAdmin={true}/>
      <Profile name="Moon SooBang" age="31" job="FireFighter" />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>React Study SPA</h1>
    </header>
  );
}

function Profile({ name, age, job, isAdmin }) {
  return (
    <main>
      <ul>
        <li>Name : {isAdmin ? "(관리자)" : ""} { name }</li>
        <li>Age : { age }</li>
        <li>Job : { job }</li>
      </ul>
    </main>
  );
}

function Footer() {
  const dateObj = new Date();
  const today = dateObj.getFullYear() + "." + (dateObj.getMonth() + 1)  + "." + dateObj.getDate();
  return (
    <footer>
      { today }
    </footer>
  );
}

export default App;