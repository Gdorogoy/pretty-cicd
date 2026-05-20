import Header from './components/Header';
import Workflow from './components/Workflow';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <Workflow />
      </main>
    </div>
  );
}

export default App;
