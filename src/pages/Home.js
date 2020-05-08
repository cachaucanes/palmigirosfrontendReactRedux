import React from 'react'
import giro from '../img/giro.png'
import '../App.css'
import Footer from './Footer'

const Home = () => {
  return (
    <div className="BackgoundMain">
      <h1 className='Title-Home'>Welcome To PalmiGiros!!!</h1>
      <div className='ImgGiro'>
        <img src={giro} alt="logo" />
      </div>
      <Footer />
    </div>
  )
}

export default Home