import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { attendanceService } from '../services/attendanceService';
import '../styles/dashboard.css';

export function DashboardPage() {
  const { user, logout } = useAuth();
  const [status, setStatus] = useState('Reached');
  const [extraHours, setExtraHours] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      await attendanceService.submit(status, extraHours, remarks);
      setMessage('Attendance submitted successfully!');
      setStatus('Reached');
      setExtraHours(0);
      setRemarks('');
    } catch (err: any) {
      setError(err.message || 'Failed to submit attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="navbar">
        <h1>SAMS - Dashboard</h1>
        <div>
          <span>Welcome, {user?.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="container">
        <div className="card">
          <h2>Submit Attendance</h2>
          
          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Reached">Reached</option>
                <option value="Late">Late</option>
                <option value="Off">Off</option>
              </select>
            </div>

            <div className="form-group">
              <label>Extra Hours</label>
              <input
                type="number"
                min="0"
                max="24"
                value={extraHours}
                onChange={(e) => setExtraHours(parseInt(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label>Remarks</label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Optional remarks"
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Attendance'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
