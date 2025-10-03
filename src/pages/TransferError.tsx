import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/transferResult.css";

type TransferData = {
  // Add the expected properties for transferData here
  // Example:
  amount?: number;
  recipient?: string;
  // Add more fields as needed
};

const TransferError: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { error, transferData } = location.state as {
    error: string;
    transferData: TransferData;
  };

  const handleRetry = () => {
    if (transferData) {
      navigate("/review", { state: transferData });
    } else {
      navigate("/account");
    }
  };

  return (
    <div className="result-container error-page">
      <div className="result-content">
        <div className="result-icon error-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>

        <h1 className="result-title">Transfer Failed</h1>
        <p className="result-message error-message">
          {error ||
            "An unexpected error occurred while processing your transfer."}
        </p>

        <div className="error-suggestions">
          <h3>What you can do:</h3>
          <ul>
            <li>Check your account balance</li>
            <li>Verify the payee details</li>
            <li>Try again in a few moments</li>
            <li>Contact support if the issue persists</li>
          </ul>
        </div>

        <div className="result-actions">
          <button className="primary-button" onClick={handleRetry}>
            Try Again
          </button>
          <button
            className="secondary-button"
            onClick={() => navigate("/account")}
          >
            Back to Accounts
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferError;
