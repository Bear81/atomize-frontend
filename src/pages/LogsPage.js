import React, { useState, useEffect } from 'react';
import axios from '../api/axiosDefaults';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import LogCard from '../components/LogCard';

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const { data } = await axios.get('/habits/');
        setHabits(data);
      } catch (err) {
        console.error('Failed to fetch habits:', err);
      }
    };
    fetchHabits();
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError('');

      try {
        const params = {};
        if (selectedHabit) params.habit = selectedHabit;
        if (selectedDate) params.date = selectedDate;

        const { data } = await axios.get('/habits/logs/', { params });
        setLogs(data);
      } catch (err) {
        console.error('Failed to fetch logs:', err);
        setError('Error fetching logs.');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [selectedHabit, selectedDate]);

  const handleLogUpdate = (updatedLog) => {
    setLogs((prevLogs) =>
      prevLogs.map((log) => (log.id === updatedLog.id ? updatedLog : log))
    );
  };

  const handleLogDelete = (deletedId) => {
    setLogs((prevLogs) => prevLogs.filter((log) => log.id !== deletedId));
  };

  const sortedLogs = logs
    .slice()
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <Container className="mt-4">
      <h2>Log Entries</h2>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Select
            value={selectedHabit}
            onChange={(e) => setSelectedHabit(e.target.value)}
          >
            <option value="">Filter by Habit</option>
            {habits.map((habit) => (
              <option key={habit.id} value={habit.id}>
                {habit.title}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Control
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </Col>
      </Row>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && sortedLogs.length === 0 && (
        <p>No logs found for the selected filters.</p>
      )}

      {sortedLogs.map((log) => (
        <LogCard
          key={log.id}
          log={log}
          habits={habits}
          onUpdate={handleLogUpdate}
          onDelete={handleLogDelete}
        />
      ))}
    </Container>
  );
};

export default LogsPage;
