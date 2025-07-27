import axios from 'axios';
import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Track the actual file
  const [prediction, setPrediction] = useState(null);  // Store the prediction (Genuine or Forged)
  const [confidence, setConfidence] = useState(null); // Store the confidence
  const [uploading, setUploading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [uploadModalMessage, setUploadModalMessage] = useState('');
  const [verifyModalMessage, setVerifyModalMessage] = useState('');

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Set image preview
      setImageFile(file); // Keep track of the actual file for upload and verification
    }
  };

  // Handle image upload to the server
  const handleUpload = async () => {
    if (!imageFile) {
      setUploadModalMessage('Please select an image first.');
      setShowUploadModal(true);
      return;
    }

    setUploading(true); // Show the upload loader
    const formData = new FormData();
    formData.append('image', imageFile); // Append the image file to the form data

    try {
      // Send the image to the backend for uploading
      await axios.post('http://localhost:5000/upload-signature', formData);
      setUploading(false);
      setUploadModalMessage('Signature uploaded successfully to the database.');
      setShowUploadModal(true);
    } catch (error) {
      setUploading(false);
      setUploadModalMessage('Failed to upload image. Please try again.');
      setShowUploadModal(true);
    }
  };

  // Handle signature verification by calling the backend API
  const handleVerify = async () => {
    if (!imageFile) {
      setVerifyModalMessage('Please upload an image first.');
      setShowVerifyModal(true);
      return;
    }

    setVerifying(true); // Show verification loader

    const formData = new FormData();
    formData.append('file', imageFile); // Send the actual file for verification

    try {
      // Send the image file to the backend for verification
      const response = await axios.post('http://localhost:5000/verify-signature', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Get the confidence from backend response
      const { confidence } = response.data;

      // Apply the logic for frontend simplification:
      // If confidence > 50, prediction is 'Genuine'; otherwise, it's 'Forged' with adjusted confidence.
      let finalPrediction = 'Genuine';
      let finalConfidence = confidence;

      if (confidence < 50) {
        finalPrediction = 'Forged';
        finalConfidence = 100 - confidence; // Invert the confidence if below 50%
      }

      // Set the final prediction result and confidence
      setPrediction(finalPrediction);
      setConfidence(finalConfidence);

      setVerifying(false); // Hide the verification loader

      // Update the modal message to include the result and confidence
      setVerifyModalMessage(`Prediction: ${finalPrediction} with confidence of ${finalConfidence}%`);
      setShowVerifyModal(true);
    } catch (error) {
      setVerifying(false); // Hide the verification loader
      setVerifyModalMessage('Error verifying signature .please try again');//editied by nagasai
      setShowVerifyModal(true);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <h1 className="dashboard-title">Welcome to Signature Verification</h1>

        {/* Image Upload Section */}
        <div className="upload-section">
          <label htmlFor="file-upload" className="upload-label">Upload Signature Image</label>
          <input 
            type="file" 
            id="file-upload" 
            className="file-input" 
            onChange={handleImageChange}
            accept="image/*"
          />
          {/* Display the uploaded image preview */}
          {image && (
            <div className="image-preview">
              <img src={image} alt="Uploaded Preview" className="preview-image" />
            </div>
          )}
        </div>

        {/* Upload Button */}
        <button 
          className="upload-btn" 
          onClick={handleUpload}
          disabled={uploading || verifying}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>

        {/* Verify Button */}
        <button 
          className="verify-btn" 
          onClick={handleVerify}
          disabled={uploading || verifying || !imageFile}
        >
          {verifying ? 'Verifying...' : 'Verify'}
        </button>

        {/* Verification Result Display */}
        {prediction && confidence && !showVerifyModal && (
          <div className="result-section">
            <h3>Prediction: {prediction}</h3>  {/* Display prediction here */}
            <p>Confidence: {confidence}%</p>
          </div>
        )}
      </div>

      {/* Modal for Upload Confirmation */}
      {showUploadModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowUploadModal(false)}>×</button>
            <p>{uploadModalMessage}</p>
            {image && <img src={image} alt="Uploaded Preview" className="modal-image" />}
            <button onClick={() => setShowUploadModal(false)} className="close-upload-modal">Close</button>
          </div>
        </div>
      )}

      {/* Modal for Verification Result */}
      {showVerifyModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowVerifyModal(false)}>×</button>
            <h2>Verification Result</h2>
            <h3>{prediction}</h3>  {/* Using prediction */}
            <p>Confidence:{confidence}%</p>
            <p>{verifyModalMessage}</p>
            <button onClick={() => setShowVerifyModal(false)} className="close-verify-modal">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
