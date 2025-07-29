import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import axios from '../api/axiosDefaults';

const LogCard = ({ log, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState(log.note || '');
  const [status, setStatus] = useState(log.status || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    const confirm = window.confirm('Delete this log entry?');
    if (!confirm) return;

    try {
      await axios.delete(`/habits/logs/${log.id}/`);
      onDelete(log.id);
    } catch (err) {
      console.error(err);
      setError('Failed to delete log.');
    }
  };

  const handleSave = async () => {
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
      console.error(err);
      setError('Failed to update log.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{log.habit_title || `Habit ID ${log.habit}`}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {new Date(log.timestamp).toLocaleString()}
        </Card.Subtitle>

        {isEditing ? (
          <>
            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">— Select —</option>
                <option value="done">Done</option>
                <option value="skipped">Skipped</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Form.Group>

            {error && <div className="text-danger small mb-2">{error}</div>}

            <Stack direction="horizontal" gap={2}>
              <Button variant="success" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </Stack>
          </>
        ) : (
          <>
            {status && (
              <Card.Text>
                <strong>Status:</strong> {status}
              </Card.Text>
            )}
            {note && (
              <Card.Text>
                <strong>Note:</strong> {note}
              </Card.Text>
            )}
            <Stack direction="horizontal" gap={2}>
              <Button
                variant="outline-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
              <Button variant="outline-danger" onClick={handleDelete}>
                Delete
              </Button>
            </Stack>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default LogCard;
