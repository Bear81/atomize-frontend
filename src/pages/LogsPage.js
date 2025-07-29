import React, { useEffect, useState } from 'react';
import axios from '../api/axiosDefaults';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LogCard from '../components/LogCard';

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [selectedHabit, setSelectedHabit] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Fetch all habits for dropdown
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const { data } = await axios.get('/habits/');
        setHabits(data);
      } catch (err) {
        console.error('Failed to load habits list');
      }
    };
    fetchHabits();
  }, []);

  // Fetch logs with filters
  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError('');
      try {
        let url = '/habits/logs/';
        const params = new URLSearchParams();
        if (selectedHabit) params.append('habit', selectedHabit);
        if (selectedDate) params.append('date', selectedDate);
        if (params.toString()) url += `?${params.toString()}`;

        const { data } = await axios.get(url);
        setLogs(data);
      } catch (err) {
        console.error('Error loading logs:', err);
        setError('Failed to load logs.');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [selectedHabit, selectedDate]);

  return (
    <Container className="py-4">
      <h1 className="mb-4">My Logs</h1>

      <Form className="mb-3">
        <Row className="g-2 align-items-end">
          <Col xs={12} md={5}>
            <Form.Label>Filter by Habit</Form.Label>
            <Form.Select
              value={selectedHabit}
              onChange={(e) => setSelectedHabit(e.target.value)}
            >
              <option value="">All Habits</option>
              {habits.map((habit) => (
                <option key={habit.id} value={habit.id}>
                  {habit.title}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={12} md={5}>
            <Form.Label>Filter by Date</Form.Label>
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </Col>
          <Col xs={12} md={2}>
            <Form.Label>&nbsp;</Form.Label>
            <Form.Control
              type="button"
              value="Clear"
              onClick={() => {
                setSelectedHabit('');
                setSelectedDate('');
              }}
              className="btn btn-outline-secondary w-100"
            />
          </Col>
        </Row>
      </Form>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && logs.length === 0 && (
        <Alert variant="info">No logs found for these filters.</Alert>
      )}

      {!loading &&
        logs.map((log) => (
          <LogCard
            key={log.id}
            log={log}
            onDelete={(id) =>
              setLogs((prev) => prev.filter((l) => l.id !== id))
            }
            onUpdate={(updated) =>
              setLogs((prev) =>
                prev.map((l) => (l.id === updated.id ? updated : l))
              )
            }
          />
        ))}
    </Container>
  );
};

export default LogsPage;
