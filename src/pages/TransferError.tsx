import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransferStore } from '../stores/transferStore';
import '../styles/transferResult.css';

const TransferError: React.FC = () => {
  const navigate = useNavigate();
  
  const selectedAccount = useTransferStore((state) => state.selectedAccount);
  const selectedPayee = useTransferStore((state) => state.selectedPayee);
  const amount = useTransferStore((state) => state.amount);
  const error = useTransferStore((state) => state.error);
  const canAccessResult = useTransferStore((state) => state.canAccessResult);
  const resetTransfer = useTransferStore((state) => state.resetTransfer);

  useEffect(() => {
    // Route guard
    if (!canAccessResult() || !error) {
      navigate('/account', { replace: true });
    }
  }, [canAccessResult, error, navigate]);

  const handleRetry = () => {
    if (selectedAccount && selectedPayee && amount) {
      navigate('/review');
    } else {
      resetTransfer();
      navigate('/account');
    }
  };

  const handleBackToAccounts = () => {
    resetTransfer();
    navigate('/account');
  };

  if (!error) {
    return null;
  }

  return (
    <div className="result-container error-page">
      <div className="result-content">
        <div className="result-icon error-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        
        <h1 className="result-title">Transfer Failed</h1>
        <p className="result-message error-message">
          {error || 'An unexpected error occurred while processing your transfer.'}
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
          <button 
            className="primary-button"
            onClick={handleRetry}
          >
            Try Again
          </button>
          <button 
            className="secondary-button"
            onClick={handleBackToAccounts}
          >
            Back to Accounts
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferError;
