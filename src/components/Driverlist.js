import React, { Component } from 'react';
import { useState, useEffect} from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import {Card, Row , Col, CardGroup, Button, Badge  } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
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
            <Row xs={2} md={2} className="g-0">
            {drivers.map((driver)=>(
              /* <div className="Driver-Container">
                <Link to={"/driverrecord/" +driver.driver_id}>
                  <h1>Driver ID: {driver.driver_id}</h1>
                  <p>Driving Minutes: {driver.mins}</p>
                  <p>Driving Scores: {driver.score}</p>
                  <p>Driving Status: {driver.status}</p>
                  
                </Link>
              </div> */
                <Col>
                <Card bg ="Light" style={{ width: '100%' }}>
                  <Card.Body>
                    <Card.Title>Driver ID: {driver.driver_id}</Card.Title>
                    {/* <Card.Subtitle className="mb-2 text-muted">Driving Minutes: {driver.mins}</Card.Subtitle> */}
                    <Card.Text bg="light"> <Badge pill bg="warning">Driving Minutes: {driver.mins} </Badge> <Badge pill bg="warning">Driving Scores: {driver.score} </Badge> <Badge pill bg="warning">Driving Status: {driver.status}</Badge></Card.Text>
                    <Button variant="primary" size="sm" href={"/driverrecord/"+driver.driver_id}>Driver Record</Button>
                    {/* <Card.Link href="#">Another Link</Card.Link> */}
                  </Card.Body>
                  
                </Card>
                </Col>
            ))}
            </Row>
        </div>
  )
  
} 


export default Driverlist
{/* <p><Link to={{pathname:"/driverrecord/",query:driver.driver_id}}>More Info</Link></p> */}