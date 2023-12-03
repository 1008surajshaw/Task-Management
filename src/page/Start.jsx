import React from 'react'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Home from './Home';
import OpenRouter from '../components/auth/OpenRouter';

const Start = () => {
    const {token} =useSelector((state) =>state.auth)
  if(token === null){
    return (
       <OpenRouter/>
      )
  }
  else {
    return <Home/>
  }
  
}

export default Start