import PrimaryNavbar from './components/PrimaryNavbar';
import { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import axiosClient from './api/axiosClient';
import ProductTable from './components/ProductTable';
import Loading from './components/Loading';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null means "still figuring out if logged in"
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    setIsLoggedIn(userEmail !== null);
  }, []);
  
  // TODO refactor to use ReactQuery
  function submitLogout(e) {
    e.preventDefault();
    axiosClient.post(
      "/api/logout",
      {withCredentials: true}
    ).then(function(res) {
      setIsLoggedIn(false);
      localStorage.removeItem('userEmail');
      localStorage.removeItem('searchTerm');
    });
  };

  if (isLoggedIn === null) {
    // While the login status is being determined, show a loading placeholder
    return <Loading message='Loading'/>;
  }

  return (
    <div>
      <PrimaryNavbar isLoggedIn={isLoggedIn} submitLogout={submitLogout} />
      {isLoggedIn && <p className="d-flex justify-content-end pe-2">Logged in as {userEmail}</p>}
      <div>
        {isLoggedIn ? (
          <ProductTable />
        )
          : (
            <div className="d-flex justify-content-center">
              <AuthForm setIsLoggedIn={setIsLoggedIn} />
            </div>
        )}
      </div>
    </div>
  );
}

export default App;
