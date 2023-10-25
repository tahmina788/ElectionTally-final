import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const HomeNew = () => {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || ''); // Initialize userEmail with localStorage value

  const [show, setShow] = useState(false);

  return (
    <>
      <div className="container">
        <div className="home-page">
          <div className="home-div">
            <p className="pt-5">You are logged in by this {userEmail} email</p>
            <h2>{show ? 'Welcome to this project' : 'Welcome to this project'}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeNew;
