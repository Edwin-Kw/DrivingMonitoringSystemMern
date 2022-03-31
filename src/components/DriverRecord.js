import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useParams} from "react-router-dom"
import FaceEventRecord from "./FaceEventRecord"
import {Card, Row , Col, CardGroup, Button, Badge  } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const DriverRecord = (props) =>{
    let { id } = useParams(); 
    const [driver, setDriver] = useState([])
    /* const [ID, setID] = useState('') */
    const [faceWarning, setfaceWarning] = useState([])
    const [CamWarning, setCamWarning] = useState([])
    const [FaceWarningCount, setFaceWarningCount] = useState('')
    const [CarWarningCountD, setCarWarningCount] = useState('')


    useEffect( async ()=>{
        /* setID(props.query.id) */
        axios.get(`http://localhost:3001/driver/${id}`)
          .then(res =>{
              const driver = res.data
              setDriver(driver)
              console.log(driver)
            })
          .catch(err=>{
              console.log(err)
          })
        
        axios.get(`http://localhost:3001/driverFace/${id}`)
          .then(res =>{
              const faceWarning = res.data
              console.log(faceWarning.slice(Math.max(faceWarning.length - 10, 0)))
              setfaceWarning(faceWarning.slice(Math.max(faceWarning.length - 10, 0)))
              setFaceWarningCount(faceWarning.length)
         })
          .catch(err=>{
              console.log(err)
          })
          axios.get(`http://localhost:3001/driverCam/${id}`)
          .then(res =>{
              const CamWarning = res.data
              console.log(CamWarning.slice(Math.max(CamWarning.length - 10, 0)))
              setCamWarning(CamWarning.slice(Math.max(CamWarning.length - 10, 0)))
              setCarWarningCount(CamWarning.length)
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
              
            <div className="Driver-Container">
                <h1>Driver ID: {driver.driver_id}</h1>
                <p>Driving Minutes: {driver.mins}</p>
                <p>Driving Scores: {driver.score}</p>
                <p>Driving Status: {driver.status}</p>
                <p>Number of Face Warning: {FaceWarningCount}</p>
                <p>Number of Road Warning: {CarWarningCountD}</p>
                
            </div>
            <h2>Last 10 Face and Gesture Detected Warnings</h2>
            
                {faceWarning.map((facePic)=>(
                    <Card>
                        <Card.Body>
                        {/* <Link to={"/faceeventrecord/"+facePic.warning_id+"/"+driver.driver_id}>
                        <p>warning_id: {facePic.warning_id} warning at: {facePic.timestringserver} </p>
                        <p>Warning message: {facePic.message}</p>
                        
                        </Link> */}
                        <Card.Header>warning_id: {facePic.warning_id}</Card.Header>
                        <Card.Title>warning at: {facePic.timestringserver} </Card.Title>
                        <Card.Text>
                        Warning message: {facePic.message}
                        </Card.Text>
                        <Button variant="primary" href={"/faceeventrecord/"+facePic.warning_id+"/"+driver.driver_id}>More</Button>
                        </Card.Body>
                    </Card>
            
                ))}
            

            <h2>Last 10 Vehicle Camera Detected Warnings</h2>
            
                {CamWarning.map((camPic)=>(
                    <Card>
                        /* <Link to={"/careventrecord/"+camPic.warning_id+"/"+driver.driver_id}>
                        <p>warning_id: {camPic.warning_id} warning at: {camPic.timestringserver} </p>
                        <p>Warning message: {camPic.warningMessage}</p>
                        
                        </Link> */
                    
                    </Card>
                ))}
            
          </div>
    )
    
  } 
  
  
  export default DriverRecord

  /* <p>Driving Minutes: {facePic.mins}</p>
                        <p>Driving Scores: {facePic.score}</p>
                        <p>Driving Status: {driver.status}</p> */
                        /* <p><Link to={{pathname:"/driverrecord/",query:driver.driver_id}}>More Info</Link></p> */

/* <p>Driving Minutes: {facePic.mins}</p>
                        <p>Driving Scores: {facePic.score}</p>
                        <p>Driving Status: {driver.status}</p> */
                        /* <p><Link to={{pathname:"/driverrecord/",query:driver.driver_id}}>More Info</Link></p> */