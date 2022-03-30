import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect} from 'react';

const Home =() =>{
    const [Asd, setAsd] = useState('')
    useEffect( async ()=>{
        //setAsd("uploads/cdb68ccc015f85288e128f2ad6e39945")
        setAsd(window.location.origin +'/'+ 'cdb68ccc015f85288e128f2ad6e39945')
    },[])
    
    return (
        <div>
            <h1>
                home
            </h1>
            {/* <img src={require('../uploads/27f7b09e1ff1d533368ed60de3f7ec4b')}></img> */} 
            
            {/* <img src={Asd}></img>  */}
        </div>
    )
}

export default Home;