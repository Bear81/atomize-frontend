// 📄 src/components/LogCard.js

import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import axios from '../api/axiosDefaults';

const LogCard = ({ log, habits, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState(log.note || '');
  const [status, setStatus] = useState(log.status || 'pending');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError('');
  };

  const handleUpdate = async () => {
    setSaving(true);
    setError('');

    try {
      const { data } = await axios.patch(`/habits/logs/${log.id}/`, {
        note,
        status,
      });
      onUpdate(data);
      setIsEditing(false);
    } catch (err) {
      console.error('Update failed:', err);
      setError('Failed to update log.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Delete this log entry?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/habits/logs/${log.id}/`);
      onDelete(log.id);
    } catch (err) {
      console.error('Delete failed:', err);
      setError('Failed to delete log.');
    }
  };

  const habitTitle =
    habits.find((h) => h.id === log.habit)?.title || `Habit ID: ${log.habit}`;

  return (
    <Card className="mb-3 shadow-sm rounded">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          {habitTitle}
          <span className="text-muted small">
            {new Date(log.timestamp).toLocaleString()}
          </span>
        </Card.Title>

        {isEditing ? (
          <>
            <Form.Group className="mb-2">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="done">Done</option>
                <option value="skipped">Skipped</option>
                <option value="partial">Partial</option>
              </Form.Select>
            </Form.Group>

            <Stack direction="horizontal" gap={2}>
              <Button
                variant="success"
                onClick={handleUpdate}
                disabled={saving}
              >
                Save
              </Button>
              <Button variant="outline-secondary" onClick={handleEditToggle}>
                Cancel
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Card.Text>
              <strong>Note:</strong> {log.note}
            </Card.Text>
            <Card.Text>
              <strong>Status:</strong> {log.status}
            </Card.Text>

            <Stack direction="horizontal" gap={2}>
              <Button variant="outline-primary" onClick={handleEditToggle}>
                Edit
              </Button>
              <Button variant="outline-danger" onClick={handleDelete}>
                Delete
              </Button>
            </Stack>
          </>
        )}

        {error && (
          <Alert variant="danger" className="mt-2 mb-0 py-1 small">
            {error}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default LogCard;
