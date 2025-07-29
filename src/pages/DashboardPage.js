import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import HabitGrid from '../components/HabitGrid';
import AddHabitModal from '../components/AddHabitModal';
import axios from '../api/axiosDefaults';

const DashboardPage = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const handleHabitCreated = (newHabit) => {
    setHabits((prev) => [newHabit, ...prev]);
  };
  const handleHabitUpdate = (updated) => {
    setHabits((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));
  };
  const handleHabitDelete = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const { data } = await axios.get('/habits/');
        setHabits(data);
      } catch (err) {
        setError('Failed to load habits.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  const handleLogHabit = (id) => {
    console.log(`Log clicked for habit ID: ${id}`);
    // 🔜 Replace with POST to /logs/ or modal trigger
  };

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const { data } = await axios.get('/habits/');
        console.log('Fetched habits:', data);
        setHabits(data);
      } catch (err) {
        console.error('Error fetching habits:', err);
        setError('Failed to load habits.');
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  return (
    <Container className="py-4">
      {console.log('DashboardPage rendered')}
      <h1 className="mb-4">My Habits</h1>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && habits.length === 0 && (
        <Alert variant="info">You haven't added any habits yet.</Alert>
      )}

      <div className="d-flex justify-content-end mb-3">
        <Button variant="success" onClick={() => setShowModal(true)}>
          + Add Habit
        </Button>
      </div>

      <AddHabitModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onHabitCreated={handleHabitCreated}
      />

      {!loading && habits.length > 0 && (
        <HabitGrid
          habits={habits}
          onLogClick={handleLogHabit}
          onHabitUpdate={handleHabitUpdate}
          onHabitDelete={handleHabitDelete}
        />
      )}
    </Container>
  );
};

export default DashboardPage;
