import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import axios from '../api/axiosDefaults';
import EditHabitForm from './EditHabitForm';

const HabitCard = ({
  id,
  title,
  description,
  frequency,
  goalType,
  priority,
  status: initialStatus,
  onLogClick,
  onHabitUpdated,
  onHabitDeleted,
}) => {
  const [status, setStatus] = useState(initialStatus || 'Pending');
  const [logging, setLogging] = useState(false);
  const [error, setError] = useState('');
  const [showEdit, setShowEdit] = useState(false);

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
      await axios.post('/habits/logs/', { habit: id });
      setStatus('Done');
    } catch (err) {
      console.error('Log error:', err);
      setError('Failed to log habit.');
    } finally {
      setLogging(false);
    }
  };

  const handleHabitUpdate = (updatedHabit) => {
    onHabitUpdated(updatedHabit);
    setShowEdit(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this habit?');
    if (!confirmed) return;

    try {
      await axios.delete(`/habits/${id}/`);
      onHabitDeleted(id);
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete habit.');
    }
  };

  return (
    <>
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

          <Stack direction="horizontal" gap={3} className="mb-2">
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

          <Stack direction="horizontal" gap={2}>
            <Button
              variant="outline-secondary"
              onClick={() => setShowEdit(true)}
            >
              Edit
            </Button>
            <Button variant="outline-danger" onClick={handleDelete}>
              Delete
            </Button>
          </Stack>

          {error && (
            <div className="text-danger mt-2 small">
              <strong>{error}</strong>
            </div>
          )}
        </Card.Body>
      </Card>

      {showEdit && (
        <EditHabitForm
          show={showEdit}
          onHide={() => setShowEdit(false)}
          habit={{
            id,
            title,
            description,
            frequency,
            goal_type: goalType,
            priority,
          }}
          onHabitUpdated={handleHabitUpdate}
        />
      )}
    </>
  );
};

export default HabitCard;
