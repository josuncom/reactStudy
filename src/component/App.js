import React, {useState} from 'react';
import AppRouter from './Router';
import firebase from 'firebase/app'
import {authService} from "../fbase";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
  <>
    <AppRouter isLoggedIn={ isLoggedIn } />
    <footer>&copy; JJABWITTER {new Date().getFullYear()}</footer>
  </>
  )
  }

export default App;
