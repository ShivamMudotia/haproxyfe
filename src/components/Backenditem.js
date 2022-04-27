import React, {useState, useEffect, useContext} from "react";
import Backendcontext from "../contexts/Backendcontext";
import {useNavigate} from 'react-router-dom'

const Backenditem = (props) => {

  const { backend } = props;
  let navigate = useNavigate();

  const context = useContext(Backendcontext);
  const {getBackend, updateBackend } = context;

  const [backendserverstatus, setBackendserverstatus] = useState(null);

  useEffect(() => {
    if(localStorage.getItem('token')){
      getBackend(backend).then(backendjson => {
        const backendarray = [];
        Object.keys(backendjson[backend]).forEach((key) => backendarray.push({ name: key, value: backendjson[backend][key]}));
        setBackendserverstatus(backendarray)
      });
    }
    else{
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

 
   const handleEdit = (home) => {
   const new_home = {
     ...home
   }
    if(new_home.value==="Enabled"){
      new_home.value="Disabled"
    }else {
      new_home.value="Enabled"
    }
    updateBackend(backend, new_home).then(() => {
      getBackend(backend).then(backendjson => {
        const backendarray = [];
        Object.keys(backendjson[backend]).forEach((key) => backendarray.push({ name: key, value: backendjson[backend][key]}));
        setBackendserverstatus(backendarray)
      });
      //window.location.reload()
    })
    props.showAlert(`${new_home.value} Successfully ! Please do not forget to reload HAProxy using button on Navigation Bar`, "success");
   }

  return (
    <>
      <div className='col-md-4'>
        <div className='card my-3 w-100 mx-auto'>
          <div className='card-header text-success fw-bold'>Backend : {backend}</div>
          {backendserverstatus?.map(home => <div key={home.name}>
          <ul className='list-group list-group-flush mx-5'>
          {home.value==='Enabled'?
            <li className='list-group-item text-primary fw-bold'>{home.name}: {home.value} 
            <i className='fa-solid fa-toggle-on mx-2' onClick={() => {handleEdit(home)}}></i>
            </li>:
            <li className='list-group-item fw-bold text-danger'>{home.name}: {home.value} 
            <i className='fa-solid fa-toggle-off mx-2' onClick={() => {handleEdit(home)}}></i>
            </li>
}
          </ul>
          </div>)}
        </div>
      </div>
    </>
  );
};

export default Backenditem;
