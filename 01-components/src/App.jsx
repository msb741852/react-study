import './App.css'

function App() {
  return (
    <div id="wrapper">
      <Header />
      <Profile />
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

function Profile() {
  return (
    <main>
      <ul>
        <li>Name : Moon SooBin</li>
        <li>Age : 30</li>
        <li>Job : Developer</li>
      </ul>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      2026. 09. 30
    </footer>
  );
}

export default App;