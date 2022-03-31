import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useParams} from "react-router-dom"
import FaceEventRecord from "./FaceEventRecord"
import {Card, Row , Col, CardGroup, Button, Badge,ListGroup  } from "react-bootstrap"
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
              console.log(faceWarning.slice(Math.max(faceWarning.length - 12, 0)))
              setfaceWarning(faceWarning)
              setFaceWarningCount(faceWarning.length)
         })
          .catch(err=>{
              console.log(err)
          })
          axios.get(`http://localhost:3001/driverCam/${id}`)
          .then(res =>{
              const CamWarning = res.data
              console.log(CamWarning.slice(Math.max(CamWarning.length - 12, 0)))
              setCamWarning(CamWarning.slice(Math.max(CamWarning.length - 12, 0)))
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
              
            {/* <div className="Driver-Container">
                <h1>Driver ID: {driver.driver_id}</h1>
                <p>Driving Minutes: {driver.mins}</p>
                <p>Driving Scores: {driver.score}</p>
                <p>Driving Status: {driver.status}</p>
                <p>Number of Face Warning: {FaceWarningCount}</p>
                <p>Number of Road Warning: {CarWarningCountD}</p>
                
            </div> */}
            <h1 style={{paddingTop:"30px"}}>Driver Record of {driver.driver_id}</h1>
            <div className="list" style={{marginLeft:"13rem",marginRight:"13rem",paddingTop:"30px",paddingBottom:"70px"}}>
            <ListGroup as="ol" >
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Driver ID: </div>
                    </div>
                    <div className="ms-2 ms-auto">
                    {driver.driver_id}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Driving Minutes:</div>
                    
                    </div>
                    <div className="ms-2 ms-auto">
                    {driver.mins}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Driving Scores:</div>
                    
                    </div>
                    <div className="ms-2 ms-auto">
                    {driver.score}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Driving Status:</div>
                    
                    </div>
                    <div className="ms-2 ms-auto">
                    {driver.status}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Number of Face Warning:</div>
                    
                    </div>
                    <div className="ms-2 ms-auto">
                    {FaceWarningCount}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Number of Road Warning:</div>
                    
                    </div>
                    <div className="ms-2 ms-auto">
                    {CarWarningCountD}
                    </div>
                </ListGroup.Item>
            </ListGroup> 

            </div>
            
            <h2>All Face and Gesture Detected Warnings</h2>
            <div style= {{height: "600px", overflowX: "hidden", overflowY: "scroll" , margin: "2%"}}>
                {/* {faceWarning.map((facePic)=>(
                    
                        <Card>
                            
                            <div className="row" style={{ display: "flex",  flexDirection: "row"}}>
                                <div className="column1" style={{ flex: '80%' }}>
                                    <Card.Body>
                                    
                                    <Card.Header>warning_id: {facePic.warning_id}</Card.Header>
                                    <Card.Title>warning at: {facePic.timestringserver} </Card.Title>
                                    <Card.Text>
                                    Warning message: {facePic.message}
                                    </Card.Text>
                                    
                                    <Button variant="primary" href={"/faceeventrecord/"+facePic.warning_id+"/"+driver.driver_id}>More</Button>
                                    </Card.Body>
                                </div>
                                <div className="column2" style={{ flex: '20%' }}>
                                    <img style={{ width: '18rem' }} variant="right" src={process.env.PUBLIC_URL + "/uploads/" +facePic.image}></img>
                                </div>
                            </div>
                        </Card>
                        
                    
                ))} */}
                <Row xs={1} md={3} className="g-3rem" >
                {faceWarning.map((facePic)=>(
                    <Col>
                    
                    <Card >
                        <Card.Img  variant="top" src={process.env.PUBLIC_URL + "/uploads/" +facePic.image}/>
                        <Card.Body>
                          <Card.Title>Warning ID: <Badge pill bg="info">{facePic.warning_id}</Badge></Card.Title>
                          <Card.Text bg="light"> <Badge pill bg="warning">warning at: {facePic.timestringserver} </Badge></Card.Text>
                          <Card.Text bg="light">
                          <Badge pill bg="warning">Warning message:</Badge> {facePic.message} 
                          
                          </Card.Text>
                          {/* <Button variant="primary">Go somewhere</Button> */}
                          <Button variant="primary" href={"/faceeventrecord/"+facePic.warning_id+"/"+driver.driver_id}>More</Button>
                        </Card.Body>
                    </Card>
                    <br></br>
                    </Col>
                ))}
                </Row>
            
            </div>
            <h2 style={{marginTop:"70px"}}>All Vehicle Camera Detected Warnings</h2>
            <div style= {{height: "600px", overflowX: "hidden", overflowY: "scroll" , margin: "2%"}}>
            <Row xs={1} md={3} className="g-3rem" >
                {CamWarning.map((camPic)=>(
                    <Col >
                        
                    <Card >
                        <Card.Img  variant="top" src={process.env.PUBLIC_URL + "/uploads/" +camPic.image}/>
                        <Card.Body>
                          <Card.Title>Warning ID: <Badge pill bg="info">{camPic.warning_id}</Badge></Card.Title>
                          <Card.Text bg="light"> <Badge pill bg="warning">warning at: {camPic.timestringserver} </Badge></Card.Text>
                          <Card.Text bg="light">
                          <Badge pill bg="warning">Warning message:</Badge> {camPic.warningMessage} 
                          
                          </Card.Text>
                          {/* <Button variant="primary">Go somewhere</Button> */}
                          <Button variant="primary" href={"/careventrecord/"+camPic.warning_id+"/"+driver.driver_id}>More</Button>
                        </Card.Body>
                    </Card>
                    <br></br>
                    </Col>
                ))}
            </Row>
            </div>
          </div>
    )
    
  } 
  
  
  export default DriverRecord


/* <Link to={"/faceeventrecord/"+facePic.warning_id+"/"+driver.driver_id}>
                                    <p>warning_id: {facePic.warning_id} warning at: {facePic.timestringserver} </p>
                                    <p>Warning message: {facePic.message}</p>
                                    
                                    </Link> */
/* <Link to={"/careventrecord/"+camPic.warning_id+"/"+driver.driver_id}>
                        <p>warning_id: {camPic.warning_id} warning at: {camPic.timestringserver} </p>
                        <p>Warning message: {camPic.warningMessage}</p>
                        
                        </Link> */
  /* <p>Driving Minutes: {facePic.mins}</p>
                        <p>Driving Scores: {facePic.score}</p>
                        <p>Driving Status: {driver.status}</p> */
                        /* <p><Link to={{pathname:"/driverrecord/",query:driver.driver_id}}>More Info</Link></p> */

/* <p>Driving Minutes: {facePic.mins}</p>
                        <p>Driving Scores: {facePic.score}</p>
                        <p>Driving Status: {driver.status}</p> */
                        /* <p><Link to={{pathname:"/driverrecord/",query:driver.driver_id}}>More Info</Link></p> */