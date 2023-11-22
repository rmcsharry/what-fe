import React, { useCallback, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './AuthForm.module.css';
import useAuthModeStore from '../stores/authModeStore';
import useLogin from '../api/useLogin';
import useRegister from '../api/useRegister';

function AuthForm({ setIsLoggedIn }) {
  const isRegister = useAuthModeStore(state => state.isRegister);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login } = useLogin(email, password);
  const { mutate: register } = useRegister(email, password, username);

  const submitLogin = useCallback(() => {
    login(({ email, password }), {
      onSuccess: (res) => {
        console.log(res)
        setIsLoggedIn(true);
        localStorage.setItem('userEmail', res.email);
      },
      onError: (err) => {
        console.log(err)
      }
    });
  }, [login, email, password]);

  const submitRegister = useCallback(() => {
    register(({ email, password, username }), {
      onSuccess: (res) => {
        console.log(res)
        setIsLoggedIn(true);
        localStorage.setItem('userEmail', res.email);
      },
      onError: (err) => {
        console.log(err)
      }
    });
  }, [register, email, password, username]);
  
  const submitAuth = useCallback((e) => {
    e.preventDefault();
    isRegister ? submitRegister() : submitLogin();
  }, [submitLogin, submitRegister, isRegister]);
  
  return (
    <Form onSubmit={submitAuth}>
      <h2 className="mb-5">{isRegister ? 'Register' : 'Login'}</h2>
      <Form.Group className={`${styles.formGroup} mb-3`} controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      {isRegister && (
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>
      )}
      <Form.Group className={`${styles.formGroup} mb-3`} controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit">
        {isRegister ? 'Register' : 'Login'}
      </Button>
    </Form>
  );
}

export default AuthForm;