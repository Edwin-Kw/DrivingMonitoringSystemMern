import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useParams} from "react-router-dom"

const CarEventRecord = (props) =>{
    let { id } = useParams(); 
    let { idx } = useParams(); 
    const [driver, setDriver] = useState([])
    /* const [ID, setID] = useState('') */
    //const [faceWarning, setFaceWarning] = useState([])
    const [CamWarning, setCamWarning] = useState([])
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
            
            <div className="Driver-Container">
                <h1>Driver ID: {driver.driver_id}</h1>
                <p>Driving Minutes: {driver.mins}</p>
                <p>Driving Scores: {driver.score}</p>
                <p>Driving Status: {driver.status}</p>
                <p>Number of Face Warning: {FaceWarningCount}</p>
                <p>Number of Road Warning: {CarWarningCountD}</p>
                
            </div>
            <div className="Face-Record">
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
            </div>
        </div>
    )
    
  } 
  
  
  export default CarEventRecord