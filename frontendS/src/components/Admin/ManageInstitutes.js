import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageInstitute.css';

const ManageInstitute = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [confirmationDialog, setConfirmationDialog] = useState(null);

  useEffect(() => {
    // Fetch pending institute registration requests when the component mounts
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get('/api/institute/pendingRequests');
        setPendingRequests(response.data);
      } catch (error) {
        console.error('Failed to fetch pending requests:', error);
      }
    };

    fetchPendingRequests();
  }, []);

  const approveRequest = async (id) => {
    try {
      const response = await axios.put(`/api/institute/approve/${id}`);
      if (response.status === 200) {
        // Move the approved request from pending to approved
        const approvedRequest = pendingRequests.find((request) => request._id === id);
        setApprovedRequests([...approvedRequests, approvedRequest]);
        setPendingRequests(pendingRequests.filter((request) => request._id !== id));
        setMessage('Request approved successfully.');
      }
    } catch (error) {
      console.error('Failed to approve request:', error);
      setMessage('Failed to approve request. Please try again.');
    }
  };

  const rejectRequest = async (id) => {
    try {
      const response = await axios.put(`/api/institute/reject/${id}`);
      if (response.status === 200) {
        // Move the rejected request from pending to rejected
        const rejectedRequest = pendingRequests.find((request) => request._id === id);
        setRejectedRequests([...rejectedRequests, rejectedRequest]);
        setPendingRequests(pendingRequests.filter((request) => request._id !== id));
        setMessage('Request rejected successfully.');
      }
    } catch (error) {
      console.error('Failed to reject request:', error);
      setMessage('Failed to reject request. Please try again.');
    }
  };

  const showConfirmationDialog = (id) => {
    setConfirmationDialog(id);
  };

  const hideConfirmationDialog = () => {
    setConfirmationDialog(null);
  };

  return (
    <div>
      <h2>Manage Institute Registration Requests</h2>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Institute Name</th>
            <th>District</th>
            <th>Owner Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.instituteName}</td>
              <td>{request.district}</td>
              <td>{request.ownerName}</td>
              <td>
                <button onClick={() => showConfirmationDialog(request._id)}>Approve</button>
                <button onClick={() => showConfirmationDialog(request._id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="approved-rejected">
        <div className="approved">
          <h3>Approved Institutes</h3>
          <table>
            <thead>
              <tr>
                <th>Institute Name</th>
                <th>District</th>
                <th>Owner Name</th>
              </tr>
            </thead>
            <tbody>
              {approvedRequests.map((request) => (
                <tr key={request._id}>
                  <td>{request.instituteName}</td>
                  <td>{request.district}</td>
                  <td>{request.ownerName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rejected">
          <h3>Rejected Institutes</h3>
          <table>
            <thead>
              <tr>
                <th>Institute Name</th>
                <th>District</th>
                <th>Owner Name</th>
              </tr>
            </thead>
            <tbody>
              {rejectedRequests.map((request) => (
                <tr key={request._id}>
                  <td>{request.instituteName}</td>
                  <td>{request.district}</td>
                  <td>{request.ownerName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {confirmationDialog && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to take this action?</p>
          <button onClick={() => approveRequest(confirmationDialog)}>Yes</button>
          <button onClick={() => rejectRequest(confirmationDialog)}>No</button>
          <button onClick={hideConfirmationDialog}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ManageInstitute;












