//rafce

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {

  const host = process.env.REACT_APP_BACKEND_HOST

  let location = useLocation();
  let navigate = useNavigate();
  
  const handleLogout=() =>{
    localStorage.removeItem('token');
    navigate('/login');
    props.showAlert("Logged Out Successfully !", "success");
  }

  const handleReload= async (e) =>{

    var auth_token = "Bearer " + localStorage.getItem('token')
  
    const response = await fetch(`${host}/reload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": auth_token
    } } );

    // eslint-disable-next-line
    const json = await response.json();
    // console.log(json)
    if(json.Success){
    props.showAlert("HAProxy Reloaded Successfully !", "success");
    }else{
    props.showAlert("HAProxy Reloaded Failed !", "danger"); 
    }

  }

  const handleStatus= async(e) =>{

    var auth_token = "Bearer " + localStorage.getItem('token')
  
    const response = await fetch(`${host}/status`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": auth_token
    } } );

    // eslint-disable-next-line
    const json = await response.json();
    //console.log(json)
    if(json.Success){
      props.showAlert("HAProxy is Up and Running !", "success");
    }else{
      props.showAlert("HAProxy is Down !", "danger");
    }

  
  }

  return (
    <>
      <div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className='container-fluid'>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className='nav-item'>
                  <Link className={`nav-link text-warning fw-bold ${location.pathname === "/" ? "active" : ""}`} aria-current='page' to='/'>Home</Link>
                </li>
                <li className='nav-item'>
                  <Link className={`nav-link text-warning fw-bold ${location.pathname === "/backends" ? "active" : ""}`} aria-current='page' to='/backends'>Backends</Link>
                </li>
              </ul>
              {localStorage.getItem('token')?
              <div>
              <button className="btn btn-secondary mx-2 text-warning fw-bold" onClick={handleReload}>Reload HAProxy</button>
              <button className="btn btn-secondary mx-2 text-warning fw-bold" onClick={handleStatus}>HAProxy Status</button>
              </div>
              :<button className="btn btn-secondary mx-2 text-warning fw-bold" >Hello There => </button>
               }
        
              {!localStorage.getItem('token')?<form className='d-flex'>
                <Link className="btn btn-success mx-2 text-warning fw-bold" to="/login" role="button">Login</Link>
              </form>: <button className="btn btn-success mx-2 text-warning fw-bold" onClick={handleLogout}>Hello {localStorage.getItem('user') } !!  Logout</button>}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
