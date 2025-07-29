import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import axios from '../api/axiosDefaults';

const EditHabitForm = ({ show, onHide, habit, onHabitUpdated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal_type: 'daily',
    frequency: 1,
    priority: 'medium',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  // Populate form when habit changes
  useEffect(() => {
    if (habit) {
      setFormData({
        title: habit.title || '',
        description: habit.description || '',
        goal_type: habit.goal_type || 'daily',
        frequency: habit.frequency || 1,
        priority: habit.priority || 'medium',
      });
    }
  }, [habit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required.';
    if (formData.frequency <= 0) newErrors.frequency = 'Must be at least 1.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});
    setServerError('');

    try {
      const { data } = await axios.patch(`/habits/${habit.id}/`, formData);
      onHabitUpdated(data); // pass updated habit back to parent
      onHide(); // close modal
    } catch (err) {
      console.error(err);
      setServerError('Failed to update habit.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Habit</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {serverError && <Alert variant="danger">{serverError}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={formData.title}
              onChange={handleChange}
              isInvalid={!!errors.title}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              value={formData.description}
              onChange={handleChange}
              as="textarea"
              rows={2}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Goal Type</Form.Label>
            <Form.Select
              name="goal_type"
              value={formData.goal_type}
              onChange={handleChange}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Frequency</Form.Label>
            <Form.Control
              name="frequency"
              type="number"
              min={1}
              value={formData.frequency}
              onChange={handleChange}
              isInvalid={!!errors.frequency}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.frequency}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={submitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={submitting}>
            {submitting ? (
              <Spinner animation="border" size="sm" />
            ) : (
              'Save Changes'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditHabitForm;
