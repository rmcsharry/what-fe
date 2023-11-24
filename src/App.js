import styles from './App.module.css';
import PrimaryNavbar from './components/PrimaryNavbar';
import { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import axiosClient from './api/axiosClient';
import ProductTable from './components/ProductTable';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const userEmail = localStorage.getItem('userEmail');

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
      {isLoggedIn && <p className="d-flex justify-content-end pe-2">Logged in as {userEmail}</p>}
      <div className="d-flex justify-content-center">
        {isLoggedIn ? (
          <div className="p-2">
            <ProductTable />
          </div>
        )
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
