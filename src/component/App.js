import React, {useState, useEffect} from 'react';
import AppRouter from './Router';
import {authService} from "../fbase";


function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        if(user.displayName === null)
        {
          user.updateProfile({
            displayName : "Jwitter",
          });
        }
        setUserObj(user)

      }
      setInit(true);
    });
  } , [])

  return (
  <>
    {init ? (
    <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}/>
     ) : (
     "Initializing..."
     )}
  </>
    );
  }

export default App;
