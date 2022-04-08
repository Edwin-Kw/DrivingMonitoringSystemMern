import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect} from 'react';
import Driverlist from "./Driverlist";
import DriverRecord from "./DriverRecord"
import {Card, Row , Col, CardGroup, Button, Badge  } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "./AllFaceEvent.css"
const AllFaceEvent =({num}) =>{
    
    const [faceWarning, setfaceWarning] = useState([])

    useEffect( async ()=>{
        //setAsd("uploads/cdb68ccc015f85288e128f2ad6e39945")
        axios.get(`http://localhost:3001/driverFace/null`)
          .then(res =>{
              const faceWarning = res.data
              //console.log(faceWarning.slice(Math.max(faceWarning.length - 12, 0)))
              setfaceWarning(faceWarning.slice(Math.max(faceWarning.length - num, 0)).reverse())
              
         })
          .catch(err=>{
              console.log(err)
          })
        
    },[])
    
    return (
        <div>
            {/* <h2>All Face and Gesture Detected Warnings</h2> */}
            <div style= {{height:"auto", overflowX: "hidden", overflowY: "auto"}}>
                <Row xs={1} md={2} className="g-1.5rem" >
                {faceWarning.map((facePic)=>(
                    <Col>
                    
                    <Card >
                        <Card.Img  variant="top" src={process.env.PUBLIC_URL + "/uploads/" +facePic.image}/>
                        <Card.Body>
                          <Card.Title>Warning ID: <Badge pill bg="info">{facePic.warning_id}</Badge></Card.Title>
                          <Card.Title>Driver ID: <Badge pill bg="primary">{facePic.driver_id}</Badge></Card.Title>
                          <Card.Text bg="light"> <Badge pill bg="warning">warning at:</Badge>{facePic.timestringserver}</Card.Text>
                          <Card.Text bg="light">
                          <Badge pill bg="warning">Warning message:</Badge> {facePic.message} 
                          
                          </Card.Text>
                          {/* <Button variant="primary">Go somewhere</Button> */}
                          <Button variant="primary" href={"/faceeventrecord/"+facePic.warning_id+"/"+facePic.driver_id}>More</Button>
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

export default AllFaceEvent;