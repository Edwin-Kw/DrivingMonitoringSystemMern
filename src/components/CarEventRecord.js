import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useParams} from "react-router-dom"
import {Card, Row , Col, CardGroup, Button, Badge,ListGroup  } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const CarEventRecord = (props) =>{
    let { id } = useParams(); 
    let { idx } = useParams(); 
    const [driver, setDriver] = useState([])
    /* const [ID, setID] = useState('') */
    //const [faceWarning, setFaceWarning] = useState([])
    const [CamWarning, setCamWarning] = useState([])
    /* const [CamWarningDistancelist, setCamWarningDistancelist] = useState([])
    const [CamWarningObjectlist, setCamWarningObjectlist] = useState([]) */
    const [CamWarningZiplist, setCamWarningZiplist] = useState([])
    const [CarWarningDriver, setCarWarningDriver] = useState('')
    const [imgpath, setImgpath] = useState('')
    
    const [FaceWarningCount, setFaceWarningCount] = useState('')
    const [CarWarningCountD, setCarWarningCount] = useState('')

    useEffect( async ()=>{
        /* setID(props.query.id) */
        console.log(id)
        
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
        axios.get(`http://localhost:3001/CamEvent/${id}`)
          .then(res =>{
              const CarWarningtemp = res.data
              console.log(CarWarningtemp[0])
              //console.log(FaceWarning.slice(Math.max(CamWarning.length - 10, 0)))
              setCamWarning(CarWarningtemp[0])
              console.log("1")
              const CarWarningDriver = CarWarningtemp[0].driver_id
              var b = CarWarningtemp[0].objectsTypeList
              var c = CarWarningtemp[0].objectsDistanceList.map(function(e, i) {
                return [b[i],": ",Math.round(e)];
              });
              setCamWarningZiplist(c)

              setCarWarningDriver(CarWarningDriver)
              let stringpath = process.env.PUBLIC_URL + "/uploads/" + CarWarningtemp[0].image
              setImgpath(stringpath)
              console.log(CarWarningtemp[0].driver_id)
              //setCarWarningCount(CamWarning.length)
            })
          .catch(err=>{
              console.log(err)
          })

        
        

        axios.get(`http://localhost:3001/driver/${idx}`)
          .then(res =>{
              const driver = res.data
              console.log(driver)
              //console.log(CarWarningDriver)
              //let theDriver = driver.find(element => element.driver_id == CarWarningDriver)
              console.log(driver)
              setDriver(driver)
              
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
        
    },[])
  
  
  
    
    return(
          
        <div>
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
            <h2 style={{}}>Warning ID: {CamWarning.warning_id}</h2>
            <div className="list" style={{marginLeft:"10rem",marginRight:"10rem",paddingTop:"30px",paddingBottom:"70px"}}>
            <ListGroup as="ol" >
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Pace:</div>
                    </div>
                    <div className="ms-2 ms-auto">
                    {CamWarning.pace}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Is Crossing line?:</div>
                    
                    </div>
                    <div className="ms-2 ms-auto">
                    {CamWarning.crossingline}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Location:</div>
                    
                    </div>
                    <div className="ms-2 ms-auto">
                    {CamWarning.location}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Objects Distance List: (Before Minusing Camera Constant i.e. 1.7)</div>
                    
                    </div>
                    <div className="ms-2 ms-auto">
                    {CamWarningZiplist.map((list)=>
                      <p>{list}</p>
                    )}
                    </div>
                </ListGroup.Item>
                {/* <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Objects Type List:</div>
                    
                    </div>
                    <div className="ms-2 ms-auto">
                    {CamWarning.objectsTypeList}
                    </div>
                </ListGroup.Item> */}
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Warning Message:</div>
                    
                    </div>
                    <div className="ms-2 ms-auto">
                    {CamWarning.warningMessage}
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
                    {CamWarning.timestringserver}
                    </div>
                </ListGroup.Item>
                
                <img src={imgpath} style={{width:"auto",maxWidth:"100%",height: "auto",maxHeight:"100%",textAlign:"center",display:"block"}}></img>
            </ListGroup> 

            </div>
            {/* <div className="Driver-Container">
                <h1>Driver ID: {driver.driver_id}</h1>
                <p>Driving Minutes: {driver.mins}</p>
                <p>Driving Scores: {driver.score}</p>
                <p>Driving Status: {driver.status}</p>
                <p>Number of Face Warning: {FaceWarningCount}</p>
                <p>Number of Road Warning: {CarWarningCountD}</p>
                
            </div> */}
            {/* <div className="Face-Record">
            <h2>Warning ID: {CamWarning.warning_id}</h2>
            <p>Pace: {CamWarning.pace}</p>
            <p>Is Crossing line?: {CamWarning.crossingline}</p>
            <p>Location: {CamWarning.location}</p>
            <p>Objects Distance List: {CamWarning.objectsDistanceList}</p>
            <p>Objects Type List: {CamWarning.objectsTypeList}</p>
            <p>Warning Message: {CamWarning.warningMessage}</p>
            <p>Warning At: {CamWarning.timestringserver}</p>
            <p>Warning Image: {CamWarning.image}</p>
            <p>Warning Image: {window.location.origin +'/'+ CamWarning.image}</p> 
            <img src={imgpath}></img> 
            </div> */}
        </div>
    )
    
  } 
  
  
  export default CarEventRecord