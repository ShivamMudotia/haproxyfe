import React, {useContext,useEffect } from 'react'
import Backenditem from './Backenditem'
import {useNavigate} from 'react-router-dom'
import Backendcontext from "../contexts/Backendcontext";

const Backends = (props) => {
  
    const context = useContext(Backendcontext);
    const {backends, getBackends, backendserverstatus} = context;
  
    let navigate = useNavigate();
    
    useEffect(() => {
      if(localStorage.getItem('token')){
        getBackends();
      }
      else{
        navigate('/login');
      }
      // eslint-disable-next-line
    }, []);
  

  return (
    <>
    <div className='row my-1 mt-1 text-dark justify-content-center'>
      <div className='my-1 text-center'>
      <h3>Status of Backends and Servers on HAProxy Load Balancer !</h3>
      </div>
      {backends.map((backend) => {
        return <Backenditem key={backend} backend={backend} backends={backends} backendserverstatus={backendserverstatus} showAlert={props.showAlert} />;
      })}
    </div>
    </>
  )
}

export default Backends