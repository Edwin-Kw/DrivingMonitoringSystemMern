import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect} from 'react';
import Driverlist from "./Driverlist";
import DriverRecord from "./DriverRecord"
import {Card, Row , Col, CardGroup, Button, Badge  } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import AllFaceEvent from "./AllFaceEvent"
import AllCarEvent from "./AllCarEvent"
const Home =() =>{
    
    const [faceWarning, setfaceWarning] = useState([])
    const [CamWarning, setCamWarning] = useState([])
    const [FaceWarningCount, setFaceWarningCount] = useState('')
    const [CarWarningCountD, setCarWarningCount] = useState('')
    useEffect( async ()=>{
        //setAsd("uploads/cdb68ccc015f85288e128f2ad6e39945")
        axios.get(`http://localhost:3001/driverFace/null`)
          .then(res =>{
              const faceWarning = res.data
              console.log(faceWarning)
              setfaceWarning(faceWarning.reverse())
              setFaceWarningCount(faceWarning.length)
         })
          .catch(err=>{
              console.log(err)
          })
        axios.get(`http://localhost:3001/driverCam/null`)
          .then(res =>{
              const CamWarning = res.data
              //console.log(CamWarning.slice(Math.max(CamWarning.length - 12, 0)))
              setCamWarning(CamWarning.reverse())
              setCarWarningCount(CamWarning.length)
            })
          .catch(err=>{
              console.log(err)
          })
        
    },[])
    
    return (
        <div style={{overflowX:"hidden",overflowY:"auto"}}>
            {/* <h1>
                home
            </h1> */}
            <div className="row" style={{display: "flex-flow", flexFlow: "row wrap",marginTop:"10px"}}>
                <div className="column" style={{width:"50%", height:"250px",overflowY:"scroll"}}>
                    <Driverlist/>
                </div>
                <div className="column" style={{width:"50%",height:"250px",overflowY:"visible"}}>
                    <AllFaceEvent/>
                </div>
                <div className="column" style={{width:"50%"}}>
                    <AllCarEvent/>
                </div>
            </div>
            {/* <img src={require('../uploads/27f7b09e1ff1d533368ed60de3f7ec4b')}></img> */} 
            
            {/* <img src={Asd}></img>  */}
        </div>
    )
}

export default Home;