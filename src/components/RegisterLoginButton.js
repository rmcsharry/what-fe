import React from 'react';
import { Button } from 'react-bootstrap';
import useAuthModeStore from '../stores/authModeStore';

function RegisterLoginButton() {
  const toggleAuthMode = useAuthModeStore(state => state.toggleAuthMode);
  const isRegister = useAuthModeStore(state => state.isRegister);

  return (
    <Button type="button" variant="light" onClick={toggleAuthMode}>
      Go to {isRegister ? 'Login' : 'Register'}
    </Button>
  )
}

export default RegisterLoginButton;