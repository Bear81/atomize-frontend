// 📄 src/pages/RegisterPage.js

import React, { useState } from 'react';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import axios from '../api/axiosDefaults';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password1: '',
    password2: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    setServerError('');

    try {
      await axios.post('/dj-rest-auth/registration/', formData);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        setServerError('An unexpected error occurred.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        {serverError && <Alert variant="danger">{serverError}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            value={formData.username}
            onChange={handleChange}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password1"
            type="password"
            value={formData.password1}
            onChange={handleChange}
            isInvalid={!!errors.password1}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password1}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="password2"
            type="password"
            value={formData.password2}
            onChange={handleChange}
            isInvalid={!!errors.password2}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password2}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={submitting}>
          {submitting ? <Spinner animation="border" size="sm" /> : 'Register'}
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
