import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode from the 'jwt-decode' library
import Navbar from './Navbar';
import AuthorDisplay from './AuthorDisplay';
import Display from './Display';

function Courses() {
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
      {isAuthor ? <AuthorDisplay /> : <Display />}
    </div>
  );
}

export default Courses;
