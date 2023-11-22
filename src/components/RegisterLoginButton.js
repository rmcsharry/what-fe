import React, { useState } from 'react';
import { Button } from 'react-bootstrap';


function RegisterLoginButton() {
  const [isRegistration, setIsRegistration] = useState(false);

  const handleToggle = () => {
    setIsRegistration(!isRegistration);
  }

  return (
    <Button type="button" variant="light" onClick={handleToggle}>{isRegistration ? 'Register' : 'Login'}</Button>
  )
}

export default RegisterLoginButton;