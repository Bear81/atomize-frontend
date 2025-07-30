// 📄 src/components/RequireAuth.js

import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Spinner, Container } from 'react-bootstrap';

export default function RequireAuth({ children }) {
  const { currentUser, authLoading } = useContext(AuthContext);
  const location = useLocation();

  if (authLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
