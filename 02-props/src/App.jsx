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
  return (
    <header className='header'>
      <h1>React Study SPA</h1>
    </header>
  );
}

function Profile({ name, age, job, isAdmin }) {
  return (
    <section>
      <ul className='list'>
        <li>Name : {isAdmin ? "(관리자)" : ""} {name}</li>
        <li>Age : {age}</li>
        <li>Job : {job}</li>
      </ul>
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

export default App;