import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useParams} from "react-router-dom"

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
            <h2>Warning ID: {faceWarning.warning_id}</h2>
            <p>Left Hand position: {faceWarning.left_hand}</p>
            <p>Right Hand position: {faceWarning.right_hand}</p>
            <p>Facing Direction (Horizontal): {faceWarning.head_hori}</p>
            <p>Facing Direction (Vertical): {faceWarning.head_vert}</p>
            <p>Warning At: {faceWarning.timestringserver}</p>
            <p>Warning Message: {faceWarning.message}</p>
            <p>Left eye: {faceWarning.lefteye}</p>
            <p>Right eye: {faceWarning.righteye}</p>
            {/* <p>Warning Image: {faceWarning.image}</p>
            <p>Warning Image: {window.location.origin +'/'+ faceWarning.image}</p> */}
            <img src={imgpath}></img>
            </div>
        </div>
    )
    
  } 
  
  
  export default FaceEventRecord