import React from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './AuthForm.module.css';
import useAuthModeStore from '../stores/authModeStore';

function AuthForm({ email, setEmail, username, setUsername, password, setPassword, submitAuth }) {
  const isRegister = useAuthModeStore(state => state.isRegister);

  return (
    <div className={styles.formContainer}>
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
    </div>
  );
}

export default AuthForm;