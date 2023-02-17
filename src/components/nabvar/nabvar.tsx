import { logOut } from '../../features/counter/LoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { RootState } from '../../redux/store';

export default function Navbar() 
{
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.counter)
  
  const log_Out = () => {      

    const payload = users.find(user => user.session === true);

    if(payload)
    {
        dispatch(logOut(payload));
        navigate("/login");
    }
    else
    {
        console.error("Error, no se pudo cerrar la session");
    }
}

  return (
    <div>
      <nav className="navbar-expand-lg navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
            <div className="navbar-nav" id="navbarTogglerDemo01">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to="/employees" className="nav-link active" aria-current="page">Employees</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/upload" className="nav-link" aria-current="page">Upload</Link>
                    </li>                    
                </ul>                
            </div>

            <button type="button" className="btn btn-outline-light" onClick={log_Out}>Log Out</button>

        </div>
    </nav>
    </div>
  )
}