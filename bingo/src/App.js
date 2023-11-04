import './App.css';
import { AmlTV } from './pages/AmlTV/AmlTV';
import { Mobile } from './pages/Mobile/Mobile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (

    <Router>
    {/* <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/mobile">Mobile</Link>
        </li>
      </ul>
    </nav> */}
    <Routes>
        <Route exact path="/"  element={<AmlTV />} />
        <Route path="/mobile" element={<Mobile />}/>
    </Routes>
    
  </Router>
  );
}

export default App;
