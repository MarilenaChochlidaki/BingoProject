import "./App.css";
import { AmlTV } from "./pages/AmlTV/AmlTV";
import AugmentedTable from "./pages/AugmentedTable/AugmentedTable";
import { Mobile } from "./pages/Mobile/Mobile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SurroundWall from "./pages/SurroundWall/SurroundWall";

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
        <Route exact path="/" element={<AmlTV />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/table" element={<AugmentedTable />} />
        <Route path="/wall" element={<SurroundWall />} />
      </Routes>
    </Router>
  );
}

export default App;
