import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

const HabitCard = ({
  title,
  description,
  frequency,
  goalType,
  priority,
  onLogClick,
  status,
}) => {
  // Map priority to Bootstrap color
  const priorityColor =
    {
      low: 'success',
      medium: 'warning',
      high: 'danger',
    }[priority] || 'secondary';

  // Optional: Status label
  const statusBadge = status ? (
    <Badge bg="info" className="ms-auto">
      {status}
    </Badge>
  ) : null;

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
            onClick={onLogClick}
          >
            Log Habit
          </Button>
          {statusBadge}
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default HabitCard;
