import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Driverlist from "./components/Driverlist";
import Home from "./components/Home";
import DriverRecord from "./components/DriverRecord"
import FaceEventRecord from "./components/FaceEventRecord"
import CarEventRecord from "./components/CarEventRecord"
function App() {
  return (
    <Router>
      <div className="App">
      <h1>Driving Monitoring System</h1>
      <div className="content">
          <Routes>
            
            <Route exact path="/" element = {<Home/>}/>
            <Route path="/driverlist" element = {<Driverlist/>}/>
            <Route path="/driverrecord/:id" element = {<DriverRecord/>}/>
            <Route path="/faceeventrecord/:id/:idx" element = {<FaceEventRecord/>}/>
            <Route path="/careventrecord/:id/:idx" element = {<CarEventRecord/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

{/*  <header className="App-header">
        <img src={require('/server/uploads/a7b1174f5b33bb2872250726c8a210fe')} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}