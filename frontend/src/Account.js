import React, { useState, useEffect } from 'react';
import { FaBell, FaInfoCircle, FaKey } from 'react-icons/fa';
import './Account.css';
import image from './user.png'; // User profile image
import axios from 'axios';

const Account = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState(null); // Store user data
  const [fetchError, setFetchError] = useState(false); // Error fetching user data

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setFetchError(false);
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data || error.message);
        setUser(null);
        setFetchError(true);
      }
    };

    fetchUserData();
  }, []);

  const toggleModal = (modalType) => {
    switch (modalType) {
      case 'info':
        setShowInfoModal(!showInfoModal);
        break;
      case 'notification':
        setShowNotificationModal(!showNotificationModal);
        break;
      case 'activity':
        setShowActivityModal(!showActivityModal);
        break;
      case 'changePassword':
        setShowChangePasswordModal(!showChangePasswordModal);
        break;
      default:
        break;
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    if (oldPassword === newPassword) {
      setErrorMessage('New password cannot be the same as the old password');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/auth/change-password',
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage('Password changed successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
      setShowChangePasswordModal(false);
      resetPasswordFields();
    } catch (error) {
      setErrorMessage('Error changing password');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const resetPasswordFields = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="account-container">
      <div className="account-wrapper">
        <h1 className="heading_account">User Account</h1>
        <img src={image} alt="User" className="profile_img" />

        <button className="info btn_account" onClick={() => toggleModal('info')}>
          <FaInfoCircle size="20" /> Info
        </button>
        <button className="notification btn_account" onClick={() => toggleModal('notification')}>
          <FaBell size="20" /> Notification
        </button>
        <button className="activity btn_account" onClick={() => toggleModal('activity')}>
          Your Activity
        </button>
        <button className="change-password btn_account" onClick={() => toggleModal('changePassword')}>
          <FaKey size="20" /> Change Password
        </button>
      </div>

      {/* Success and Error Messages */}
      {successMessage && <div className="success-popup">{successMessage}</div>}
      {errorMessage && <div className="error-popup">{errorMessage}</div>}

      {/* Info Modal */}
      {showInfoModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>User Info</h3>
            <p>
              <strong>Email:</strong> {user ? user.email : fetchError ? 'Error fetching user info' : 'Not logged in'}
            </p>
            <p>
              <strong>Password:</strong> ********
            </p>
            <button className="modal-cancel-btn" onClick={() => toggleModal('info')}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Notifications</h3>
            <p>No new notifications.</p>
            <button className="modal-cancel-btn" onClick={() => toggleModal('notification')}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Activity Modal */}
      {showActivityModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Your Activity</h3>
            <p>No recent activities.</p>
            <button className="modal-cancel-btn" onClick={() => toggleModal('activity')}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Change Password</h3>
            <div className="flex-column">
              <label>Old Password</label>
              <input
                type="password"
                placeholder="Enter your old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="flex-column">
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="flex-column">
              <label>Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="modal-buttons">
              <button className="modal-cancel-btn" onClick={() => toggleModal('changePassword')}>
                Cancel
              </button>
              <button className="modal-submit-btn" onClick={handleChangePassword}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
