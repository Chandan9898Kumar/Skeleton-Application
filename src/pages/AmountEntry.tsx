import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransferStore } from '../stores/transferStore';
import { TransferForm } from '../components/TransferForm';
import ComponentErrorBoundary from '../components/ComponentErrorBoundary';
import '../styles/amountEntry.css';

const AmountEntry: React.FC = () => {
  const navigate = useNavigate();
  
  const selectedAccount = useTransferStore((state) => state.selectedAccount);
  const selectedPayee = useTransferStore((state) => state.selectedPayee);
  const canAccessAmount = useTransferStore((state) => state.canAccessAmount);
  const setTransferDetails = useTransferStore((state) => state.setTransferDetails);
  const resetToPayee = useTransferStore((state) => state.resetToPayee);

  useEffect(() => {
    // Route guard
    if (!canAccessAmount()) {
      navigate('/account', { replace: true });
    }
  }, [canAccessAmount, navigate]);

  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(Math.abs(amount));
  };

  const handleFormSubmit = (amount: number, purpose: string, description: string) => {
    setTransferDetails(amount, purpose, description);
    navigate('/review');
  };

  const handleBack = () => {
    resetToPayee();
    navigate('/payee');
  };

  if (!selectedAccount || !selectedPayee) {
    return null;
  }

  return (
    <div className="amount-entry-container">
      <div className="amount-entry-header">
        <button 
          className="back-button"
          onClick={handleBack}
        >
          ← Back
        </button>
        <h1 className="amount-entry-title">Transfer Amount</h1>
      </div>

      <div className="transfer-summary">
        <div className="summary-section">
          <h2 className="summary-title">From:</h2>
          <div className="summary-card">
            <div className="summary-icon">{selectedAccount.icon}</div>
            <div className="summary-info">
              <h3 className="summary-name">{selectedAccount.accountName}</h3>
              <p className="summary-detail">{selectedAccount.accountNumber}</p>
              <p className={`summary-balance ${selectedAccount.balance < 0 ? 'negative' : ''}`}>
                Available: {selectedAccount.balance < 0 ? '-' : ''}{formatCurrency(selectedAccount.balance, selectedAccount.currency)}
              </p>
            </div>
          </div>
        </div>

        <div className="summary-divider">→</div>

        <div className="summary-section">
          <h2 className="summary-title">To:</h2>
          <div className="summary-card">
            <div className="summary-icon">{selectedPayee.bankLogo}</div>
            <div className="summary-info">
              <h3 className="summary-name">{selectedPayee.name}</h3>
              <p className="summary-detail">{selectedPayee.bankName}</p>
              <p className="summary-detail">{selectedPayee.accountNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <ComponentErrorBoundary componentName="Transfer Form">
        <TransferForm onSubmit={handleFormSubmit} />
      </ComponentErrorBoundary>
    </div>
  );
};

export default AmountEntry;
