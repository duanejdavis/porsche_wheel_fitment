import Fitment from './fitment.js'
import logo from './porsche-vector-logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <section>
          <Fitment />
        </section>
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;
