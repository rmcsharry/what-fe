import styles from './App.module.css';
import PrimaryNavbar from './components/PrimaryNavbar';
import { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import useAuthModeStore from './stores/authModeStore';
import axiosClient from './api/axiosClient';

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isRegister = useAuthModeStore(state => state.isRegister);

  useEffect(() => {
    var userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setCurrentUser(true);
    }
  },[currentUser]);

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

  function submitAuth(e) {
    e.preventDefault();
    const url = isRegister ? "/api/register" : "/api/login";
    const data = isRegister ? { email, username, password } : { email, password };
    axiosClient.post(url, data).then(function (res) {
      setCurrentUser(true);
      localStorage.setItem('userEmail', res.data.email);
    });
  }

  return (
    <div>
      <PrimaryNavbar currentUser={currentUser} submitLogout={submitLogout} />
      <div className={styles.mainContainer}>
        {currentUser ? (<h1>You're logged in</h1>)
          : (
          <AuthForm
            email={email}
            setEmail={setEmail}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            submitAuth={submitAuth}
          />
        )}
      </div>
    </div>
  );
}

export default App;
