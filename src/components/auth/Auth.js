import React, { useEffect } from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux';


/* export const havePermissions = () => {
  
} */


const Auth = (props) => {
  useEffect(() => {
    console.log('Auth.js',props.location.pathname);
  },[props.location.pathname])
    
  const userSession = useSelector((state) => state.fetchAuth)    
  if(userSession.isLogged){
    return (
      <Route {...props}/>
    )
  }else{
    return(
      <Redirect to={{
        pathname: "/login",
        state: {
          isAuthenticated: props.location.pathname
        }
        }}/>
    )
  }    
}
export default Auth