import logo from "./logo.svg";
import "./App.css";
import axios from 'axios';
import PrimaryNavbar from './components/PrimaryNavbar';
import { useState } from 'react';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function App() {
  const [currentUser, setCurrentUser] = useState();

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/api/logout",
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(false);
    });
  }

  return (
    <div>
      <PrimaryNavbar currentUser={currentUser} submitLogout={submitLogout} />
    </div>
  );
}

export default App;
