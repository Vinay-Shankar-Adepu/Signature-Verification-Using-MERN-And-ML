const mongoose = require('mongoose');

const signatureSchema = new mongoose.Schema({
  userId: { type: String, required: false }, // Optional: associate with user
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  verificationResult: { type: String, required: false }, // Will be added after verification
  confidence: { type: Number, required: false } // Will be added after verification
});

module.exports = mongoose.model('Signature', signatureSchema);
