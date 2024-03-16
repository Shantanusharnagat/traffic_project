import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import Navbar from './Navbar'
import About from './About'
import UpdateLocaton from './UpdateLocaton';
//import Cards from './Cards'

function Home() {
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    // Check the 'token' cookie to determine the user's role
    const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
    
    if (token) {
      const decodedToken = jwtDecode(token.split('=')[1]);
      setIsAuthor(decodedToken.isAuthor);
    }
  }, []);



  return (
    <div>
      <Navbar />
      <About/>
      {isAuthor ?  <UpdateLocaton/> : null}
    </div>
  )

  }
export default Home;