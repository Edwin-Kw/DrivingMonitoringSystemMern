import React, { Component } from 'react';
import { useState, useEffect} from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import {Card, Row , Col, CardGroup, Button, Badge  } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
const Driverlist = ({isTitle}) =>{

  const [drivers, setDrivers] = useState([])
  const [FaceWarningCount, setFaceWarningCount] = useState('')
  const [CarWarningCountD, setCarWarningCount] = useState('')
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
    /* axios.get(`http://localhost:3001/driverFace/${id}`)
        .then(res =>{
            const faceWarning = res.data
            //console.log(faceWarning.slice(Math.max(faceWarning.length - 12, 0)))
            
            setFaceWarningCount(faceWarning.length)
       })
        .catch(err=>{
            console.log(err)
        })
    axios.get(`http://localhost:3001/driverCam/${id}`)
        .then(res =>{
            const CamWarning = res.data
            //console.log(CamWarning.slice(Math.max(CamWarning.length - 12, 0)))
            
            setCarWarningCount(CamWarning.length)
          })
        .catch(err=>{
            console.log(err)
        }) */
    
    
  },[])

  function getScore(id){
    /* axios.get(`http://localhost:3001/driverFace/${id}`)
        .then(res =>{
            const faceWarning = res.data
            //console.log(faceWarning.slice(Math.max(faceWarning.length - 12, 0)))
            
            setFaceWarningCount(faceWarning.length)
       })
        .catch(err=>{
            console.log(err)
        })
    axios.get(`http://localhost:3001/driverCam/${id}`)
        .then(res =>{
            const CamWarning = res.data
            //console.log(CamWarning.slice(Math.max(CamWarning.length - 12, 0)))
            
            setCarWarningCount(CamWarning.length)
          })
        .catch(err=>{
            console.log(err)
        }) 
    return (100 - FaceWarningCount - CarWarningCountD) */
  }


  
  return(
        <div className="Driver-List">
            {/* <p>
              driverlist
            </p> */}
            {isTitle
            ? <div></div>
            : <div className=" text-dark" style={{background: 'LightGoldenRodYellow',paddingTop:"150px",paddingBottom:"150px",marginBottom:"5px"}}><h1>Drivers</h1></div>
            }
            <Row xs={2} md={3} className="g-0">
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
                    <Card.Text bg="light"> <Badge pill bg="warning">Driving Minutes: {driver.mins} </Badge> <Badge pill bg="warning">Driving Status: {driver.status}</Badge></Card.Text>
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