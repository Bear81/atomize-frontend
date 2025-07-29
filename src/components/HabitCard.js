// 📄 src/components/HabitCard.js

import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import axios from '../api/axiosDefaults';

const HabitCard = ({
  id,
  title,
  description,
  frequency,
  goalType,
  priority,
  status: initialStatus,
}) => {
  const [status, setStatus] = useState(initialStatus || 'Pending');
  const [logging, setLogging] = useState(false);
  const [error, setError] = useState('');

  const priorityColor =
    {
      low: 'success',
      medium: 'warning',
      high: 'danger',
    }[priority] || 'secondary';

  const statusBadge = (
    <Badge bg="info" className="ms-auto text-capitalize">
      {status}
    </Badge>
  );

  const handleLogClick = async () => {
    setLogging(true);
    setError('');

    try {
      await axios.post('/habits/logs/', {
        habit: id,
      });

      setStatus('Done');
    } catch (err) {
      console.error('Log error:', err);
      setError('Failed to log habit.');
    } finally {
      setLogging(false);
    }
  };

  return (
    <Card className="mb-3 shadow-sm rounded">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          {title}
          <Badge bg={priorityColor} className="text-uppercase">
            {priority}
          </Badge>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {goalType} - {frequency}
        </Card.Subtitle>
        <Card.Text>{description}</Card.Text>

        <Stack direction="horizontal" gap={3}>
          <Button
            variant="primary"
            className="flex-grow-1"
            onClick={handleLogClick}
            disabled={logging || status === 'Done'}
          >
            {logging ? 'Logging...' : 'Log Habit'}
          </Button>
          {statusBadge}
        </Stack>

        {error && (
          <div className="text-danger mt-2 small">
            <strong>{error}</strong>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default HabitCard;
