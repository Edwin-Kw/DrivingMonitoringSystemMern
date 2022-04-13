import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useParams} from "react-router-dom"
import {Card, Row , Col, CardGroup, Button, Badge,ListGroup  } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const FaceEventRecord = (props) =>{
    let { id } = useParams(); 
    let { idx } = useParams(); 
    const [driver, setDriver] = useState([])
    /* const [ID, setID] = useState('') */
    const [faceWarning, setFaceWarning] = useState([])
    //const [CamWarning, setCamWarning] = useState([])
    const [FaceWarningDriver, setFaceWarningDriver] = useState('')
    const [imgpath, setImgpath] = useState('')
    
    const [FaceWarningCount, setFaceWarningCount] = useState('')
    const [CarWarningCountD, setCarWarningCount] = useState('') 
    const [eventLinkage, setEventLinkage] = useState([])

    useEffect( async ()=>{
        /* setID(props.query.id) */
        console.log("1")
        
        /* axios.get(`http://localhost:3001/driverCam/${FaceWarningDriver}`)
          .then(res =>{
              const faceWarning = res.data
              console.log(faceWarning.slice(Math.max(faceWarning.length - 10, 0)))
              setfaceWarning(faceWarning.slice(Math.max(faceWarning.length - 10, 0)))
              setFaceWarningCount(faceWarning.length)
         })
          .catch(err=>{
              console.log(err)
          }) */
        axios.get(`http://localhost:3001/FaceEvent/${id}`)
          .then(res =>{
              const FaceWarningtemp = res.data
              console.log(FaceWarningtemp)
              //console.log(FaceWarning.slice(Math.max(CamWarning.length - 10, 0)))
              setFaceWarning(FaceWarningtemp[0])
              console.log("1")
              setFaceWarningDriver(FaceWarningtemp[0].driver_id.toString())
              let stringpath = process.env.PUBLIC_URL + "/uploads/" + FaceWarningtemp[0].image
              setImgpath(stringpath)
              console.log(FaceWarningtemp[0].driver_id.toString())
              //setCarWarningCount(CamWarning.length)
            })
          .catch(err=>{
              console.log(err)
          })

        
        

        axios.get(`http://localhost:3001/driver/${idx}`)
          .then(res =>{
              const drivertemp = res.data
              setDriver(drivertemp)
              console.log(drivertemp)
            })
          .catch(err=>{
              console.log(err)
          })
        
        axios.get(`http://localhost:3001/driverCam/${idx}`)
          .then(res =>{
              const faceWarningtemp = res.data
              console.log("2")
              setFaceWarningCount(faceWarningtemp.length)
         })
          .catch(err=>{
              console.log(err)
          })
        axios.get(`http://localhost:3001/driverFace/${idx}`)
          .then(res =>{
              const CamWarningtemp = res.data
              console.log("3")
              setCarWarningCount(CamWarningtemp.length)
            })
          .catch(err=>{
              console.log(err)
          })
        axios.get(`http://localhost:3001/linkdriverCam/${id}/${idx}`) //"/linkdriverFace/:id/:idx"
          .then(res =>{
              const eventLinkageTemp = res.data
              console.log(eventLinkageTemp)
              setEventLinkage(eventLinkageTemp)
            })
          .catch(err=>{
              console.log(err)
          })
        
    },[])
  
  
  
    
    return(
          
        <div>
            
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
            <h2 style={{}}>Warning ID: {faceWarning.warning_id}</h2>
            <div className="list" style={{marginLeft:"10rem",marginRight:"10rem",paddingTop:"30px",paddingBottom:"70px"}}>
            <ListGroup as="ol" >
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Left Hand position: </div>
                    </div>
                    <div className="ms-2 ms-auto">
                    {faceWarning.left_hand}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Right Hand position: </div>
                    
                    </div>
                    <div className="ms-2 ms-auto">
                    {faceWarning.right_hand}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Facing Direction (Horizontal):</div>
                    
                    </div>
                    <div className="ms-2 ms-auto">
                    {faceWarning.head_hori}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Facing Direction (Vertical):</div>
                    
                    </div>
                    <div className="ms-2 ms-auto">
                    {faceWarning.head_vert}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Warning At:</div>
                    
                    </div>
                    <div className="ms-2 ms-auto">
                    {faceWarning.timestringserver}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Warning Message:</div>
                    
                    </div>
                    <div className="ms-2 ms-auto">
                    {faceWarning.message}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Left eye:</div>
                    
                    </div>
                    <div className="ms-2 ms-auto">
                    {faceWarning.lefteye}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Right eye:</div>
                    
                    </div>
                    <div className="ms-2 ms-auto">
                    {faceWarning.righteye}
                    </div>
                </ListGroup.Item>
                
                <img src={imgpath} style={{width:"auto",maxWidth:"100%",height: "auto",maxHeight:"100%",textAlign:"center",display:"block"}}></img>
            </ListGroup> 
            <div className="bg-warning text-light" style={{paddingTop:"100px",paddingBottom:"100px"}}><h2>Vehicle Camera Detected Warnings within 4 hours</h2></div>
            <div className="scrollbar scrollbar-primary" style= {{height: "600px", overflowX: "hidden", overflowY: "scroll" , margin: "2%"}}>
            <Row xs={1} md={3} className="g-3rem" >
                {eventLinkage.map((camPic)=>(
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
            
            {/* <div className="Face-Record">
            <h2>Warning ID: {faceWarning.warning_id}</h2>
            <p>Left Hand position: {faceWarning.left_hand}</p>
            <p>Right Hand position: {faceWarning.right_hand}</p>
            <p>Facing Direction (Horizontal): {faceWarning.head_hori}</p>
            <p>Facing Direction (Vertical): {faceWarning.head_vert}</p>
            <p>Warning At: {faceWarning.timestringserver}</p>
            <p>Warning Message: {faceWarning.message}</p>
            <p>Left eye: {faceWarning.lefteye}</p>
            <p>Right eye: {faceWarning.righteye}</p>
            <img src={imgpath}></img>
            </div> */}
        </div>
    )
    
  } 
  
  
  export default FaceEventRecord

  {/* <p>Warning Image: {faceWarning.image}</p>
            <p>Warning Image: {window.location.origin +'/'+ faceWarning.image}</p> */}