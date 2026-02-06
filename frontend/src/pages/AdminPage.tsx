import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminService } from '../services/adminService';
import '../styles/admin.css';

export function AdminPage() {
  const { user, logout } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [summary, setSummary] = useState([]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, [month]);

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      const [empRes, sumRes] = await Promise.all([
        adminService.getEmployees(),
        adminService.getAttendanceSummary(month),
      ]);

      setEmployees(empRes.data);
      setSummary(sumRes.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const data = await adminService.exportData(month);
      // Trigger download
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `attendance-${month}.csv`;
      a.click();
    } catch (err) {
      setError('Failed to export data');
    }
  };

  if (user?.role !== 'Admin') {
    return <div className="error-message">You don't have admin access</div>;
  }

  return (
    <div className="admin-page">
      <div className="navbar">
        <h1>SAMS - Admin Dashboard</h1>
        <div>
          <span>Welcome, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="container">
        {error && <div className="error-message">{error}</div>}

        <div className="controls">
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <button onClick={handleExport}>Export CSV</button>
        </div>

        <h2>Attendance Summary ({month})</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="summary-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Reached</th>
                <th>Late</th>
                <th>Off</th>
                <th>Extra Hours</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((row: any) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.reached_days}</td>
                  <td>{row.late_days}</td>
                  <td>{row.off_days}</td>
                  <td>{row.total_extra_hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
