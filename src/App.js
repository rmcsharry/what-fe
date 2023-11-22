import "./App.css";
import axios from 'axios';
import PrimaryNavbar from './components/PrimaryNavbar';
import { useState } from 'react';
import AuthForm from './components/AuthForm';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/api/logout",
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(false);
    });
  }

  function submitAuth(e) {
    e.preventDefault();
    const url = authMode === 'register' ? "/api/register" : "/api/login";
    const data = authMode === 'register' ? { email, username, password } : { email, password };
    client.post(url, data).then(function(res) {
      setCurrentUser(true);
    });
  }

  return (
    <div>
      <PrimaryNavbar currentUser={currentUser} submitLogout={submitLogout} />
      <AuthForm
        mode={authMode}
        email={email}
        setEmail={setEmail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        submitAuth={submitAuth}
      />
    </div>
  );
}

export default App;
