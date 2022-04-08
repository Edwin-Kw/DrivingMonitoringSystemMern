import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Driverlist from "./components/Driverlist";
import Home from "./components/Home";
import DriverRecord from "./components/DriverRecord"
import FaceEventRecord from "./components/FaceEventRecord"
import CarEventRecord from "./components/CarEventRecord"
import NavbarObj from "./components/NavbarObj"
import AllEvent from "./components/AllEvent"

function App() {
  return (
    <Router>

      <NavbarObj></NavbarObj>
      <div className="App">
      
        <div className="content">
            <Routes>
              <Route exact path="/" element = {<Home/>}/>
              <Route path="/driverlist" element = {<Driverlist/>}/>
              <Route path="/allevent" element = {<AllEvent/>}/>
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

