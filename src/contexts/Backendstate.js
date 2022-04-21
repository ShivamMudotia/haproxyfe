import React, { useState } from "react";
import Backendcontext from "./Backendcontext";

const Backendstate = (props) => {
  
  const host = process.env.REACT_APP_BACKEND_HOST
  
  const BackendsInitial = [];
  const [backends, setBackends] = useState(BackendsInitial);

  const getBackends = async () => {
    //  API Call
    var auth_token = "Bearer " + localStorage.getItem('token')
    
    const response = await fetch(`${host}/backends`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth_token
      } } );

    const json = await response.json();
    setBackends(json.All_Backends);
    }

  const getBackend = async (backend) => {
    //  API Call
    var auth_token = "Bearer " + localStorage.getItem('token')
    
    const response = await fetch(`${host}/backends/${backend}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth_token
      } } );

    const json = await response.json();
    return json
};


const updateBackend = async (backend,home) => {
  //  API Call
  var auth_token = "Bearer " + localStorage.getItem('token')
  
  const response = await fetch(`${host}/backends/${backend}/${home.name}/${home.value}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": auth_token
    } } );

  const json = await response.json();
  return json
};

return <Backendcontext.Provider value={{ backends , getBackends, getBackend,updateBackend }}>{props.children}</Backendcontext.Provider>;

}

export default Backendstate;
