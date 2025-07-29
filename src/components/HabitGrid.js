import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HabitCard from './HabitCard';
import Alert from 'react-bootstrap/Alert';

const HabitGrid = ({ habits, onLogClick, onHabitUpdate, onHabitDelete }) => {
  if (!habits.length) {
    return <Alert variant="info">No habits to display.</Alert>;
  }
  console.log('Habits received by HabitGrid:', habits);

  return (
    <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
      {habits.map((habit) => (
        <Col key={habit.id}>
          <HabitCard
            key={habit.id}
            id={habit.id}
            title={habit.title}
            description={habit.description}
            frequency={habit.frequency}
            goalType={habit.goal_type}
            priority={habit.priority}
            status={habit.status}
            onHabitUpdated={(updatedHabit) =>
              onHabitUpdate && onHabitUpdate(updatedHabit)
            }
            onHabitDeleted={(id) => onHabitDelete && onHabitDelete(id)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default HabitGrid;
