import React, { Component } from 'react';
import { useState, useEffect} from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

const Driverlist = () =>{

  const [drivers, setDrivers] = useState([])
  
  useEffect( async ()=>{
    axios.get("http://localhost:3001/driverlist/")
        .then(res =>{
            const drivers = res.data
            setDrivers(drivers)
            console.log(drivers)
       })
        .catch(err=>{
            console.log(err)
        })
    
  },[])



  
  return(
        <div className="Driver-List">
            {/* <p>
              driverlist
            </p> */}
            {drivers.map((driver)=>(
              <div className="Driver-Container">
                <Link to={"/driverrecord/" +driver.driver_id}>
                  <h1>Driver ID: {driver.driver_id}</h1>
                  <p>Driving Minutes: {driver.mins}</p>
                  <p>Driving Scores: {driver.score}</p>
                  <p>Driving Status: {driver.status}</p>
                  {/* <p><Link to={{pathname:"/driverrecord/",query:driver.driver_id}}>More Info</Link></p> */}
                </Link>
              </div>
            ))}
        </div>
  )
  
} 


export default Driverlist
