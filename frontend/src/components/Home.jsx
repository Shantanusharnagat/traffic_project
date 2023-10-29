import React from 'react'
import Navbar from './Navbar'
import About from './About'
//import Cards from './Cards'
import Display from './Display'

const Home = () => {
  return (
    <div>
      <Navbar />
      <About/>
      <Display/>
    </div>
  )
}

export default Home