import styles from './App.module.css';
import PrimaryNavbar from './components/PrimaryNavbar';
import { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import axiosClient from './api/axiosClient';


function App() {
  const [currentUser, setCurrentUser] = useState();
 
  useEffect(() => {
    var userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setCurrentUser(true);
    }
  },[currentUser]);

  // TODO refactor to use ReactQuery
  function submitLogout(e) {
    e.preventDefault();
    axiosClient.post(
      "/api/logout",
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(false);
      localStorage.removeItem('userEmail');
    });
  }

  return (
    <div>
      <PrimaryNavbar currentUser={currentUser} submitLogout={submitLogout} />
      <div className={styles.mainContainer}>
        {currentUser ? (<h1>You're logged in</h1>)
          : (
            <AuthForm
              setCurrentUser={setCurrentUser}
            />
        )}
      </div>
    </div>
  );
}

export default App;
