import styles from './App.module.css';
import PrimaryNavbar from './components/PrimaryNavbar';
import { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import axiosClient from './api/axiosClient';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
 
  useEffect(() => {
    var userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setIsLoggedIn(true);
    }
  },[isLoggedIn]);

  // TODO refactor to use ReactQuery
  function submitLogout(e) {
    e.preventDefault();
    axiosClient.post(
      "/api/logout",
      {withCredentials: true}
    ).then(function(res) {
      setIsLoggedIn(false);
      localStorage.removeItem('userEmail');
    });
  }

  return (
    <div>
      <PrimaryNavbar isLoggedIn={isLoggedIn} submitLogout={submitLogout} />
      <div className={styles.mainContainer}>
        {isLoggedIn ? (<h1>You're logged in</h1>)
          : (
            <AuthForm
              setIsLoggedIn={setIsLoggedIn}
            />
        )}
      </div>
    </div>
  );
}

export default App;
