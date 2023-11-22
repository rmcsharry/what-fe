import React from 'react';
import { Button } from 'react-bootstrap';
import useAuthStore from '../stores/authModeStore';

function RegisterLoginButton() {
  const toggleAuthMode = useAuthStore(state => state.toggleAuthMode);
  const isRegister = useAuthStore(state => state.isRegister);
  const setAuthError = useAuthStore(state => state.setError);

  const handleClick = () => {
    toggleAuthMode();
    setAuthError(null);
  }

  return (
    <Button type="button" variant="light" onClick={handleClick}>
      Go to {isRegister ? 'Login' : 'Register'}
    </Button>
  )
}

export default RegisterLoginButton;