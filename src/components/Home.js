// rafce

import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom'
// import Backends from "./Backends";

export const Home = (props) => {

  let navigate = useNavigate();
    
  useEffect(() => {
    if(localStorage.getItem('token')){

    }
    else{
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className='my-3 text-center'>
      <h3>Welcome to HAProxy Load Balancer Manager</h3>
    </div>
  );
};

export default Home;
