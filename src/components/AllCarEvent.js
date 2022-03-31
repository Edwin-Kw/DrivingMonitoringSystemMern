import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect} from 'react';
import Driverlist from "./Driverlist";
import DriverRecord from "./DriverRecord"
import {Card, Row , Col, CardGroup, Button, Badge  } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const AllCarEvent =() =>{
    
    const [CamWarning, setCarWarning] = useState([])

    useEffect( async ()=>{
        //setAsd("uploads/cdb68ccc015f85288e128f2ad6e39945")
        axios.get(`http://localhost:3001/driverCam/null`)
          .then(res =>{
              const CamWarning = res.data
              //console.log(faceWarning.slice(Math.max(faceWarning.length - 12, 0)))
              setCarWarning(CamWarning.slice(Math.max(CamWarning.length - 12, 0)).reverse())
              
         })
          .catch(err=>{
              console.log(err)
          })
        
    },[])
    
    return (
        <div>
            {/* <h2>All Vehicle Camera Detected Warnings</h2> */}
            <div style= {{height:"750px",overflowX: "hidden", overflowY: "auto" }}>
            <Row xs={1} md={2} className="g-1" >
                {CamWarning.map((camPic)=>(
                    <Col >
                        
                    <Card >
                        <Card.Img  variant="top" src={process.env.PUBLIC_URL + "/uploads/" +camPic.image}/>
                        <Card.Body>
                          <Card.Title>Warning ID: <Badge pill bg="info">{camPic.warning_id}</Badge></Card.Title>
                          <Card.Text bg="light"> <Badge pill bg="warning">warning at:</Badge>{camPic.timestringserver} </Card.Text>
                          <Card.Text bg="light">
                          <Badge pill bg="warning">Warning message:</Badge> {camPic.warningMessage} 
                          
                          </Card.Text>
                          {/* <Button variant="primary">Go somewhere</Button> */}
                          <Button variant="primary" href={"/careventrecord/"+camPic.warning_id+"/"+camPic.driver_id}>More</Button>
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

export default AllCarEvent;