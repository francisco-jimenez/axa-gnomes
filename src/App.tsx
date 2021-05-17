import './App.css';
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Home />
      </BrowserRouter>
    </div>
  );
}

export default App;
