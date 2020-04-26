import React from 'react'
import giro from '../img/giro.png'
import '../App.css'

const Home = () => {
  return (
    <div>
      <h1 className='Title-Home'>Welcome To PalmiGiros!!!</h1>
      <div className='ImgGiro'>
      <img src={giro} alt="logo"/>
      </div>
    </div>
  )
}

export default Home