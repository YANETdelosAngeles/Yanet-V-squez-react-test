import { Routes, Route, HashRouter, Navigate } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/nabvar/nabvar";
import Login from './components/login/login';
import './App.css';
import Employees from "./components/employees/employees";
import Upload from "./components/upload/upload";
import { Required } from "./protectedRoute/protectedRoute";
import { RequiredLogin } from "./protectedRoute/proyectedLoginLogged";
import { RequiredEmployeesRandom } from "./protectedRoute/protectedRadomAuth";

function App() 
{
  return (
    <>
      <div className="App">     
        <HashRouter basename="/">              
          <Routes>
            {/* <Route path = "/" element = {<RequiredLogin><Login></Login></RequiredLogin>}></Route> */}
            <Route path = "/login" element = {<Login></Login>}></Route>
            <Route path = "/employees" element = {<Required><><Navbar></Navbar> <Employees></Employees></></Required>}></Route>
            <Route path = "/upload" element = {<Required><><Navbar></Navbar> <Upload></Upload></></Required>}></Route>
            <Route path = "*" element = {<RequiredEmployeesRandom><Login></Login></RequiredEmployeesRandom>}></Route>
          </Routes> 
        </HashRouter>
      </div>      
    </>    
  );
}

export default App;
