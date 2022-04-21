import "./App.css";
import image from './images/background.jpeg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Backends from './components/Backends'
import { useState } from "react";
import Backendstate from './contexts/Backendstate'


function App() {

  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout( () => {
      setAlert(null);
    }, 3000);
  }
  

  return (
    <>
        <div style={{ backgroundImage:`url(${image})`,backgroundPosition: 'center', backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat', width: '100vw', height: '100vh' }}>
        <Backendstate showAlert={showAlert}>
          <Router>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/backends" element={<Backends showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
        </Backendstate>
        </div>
    </>
  );
}

export default App;
