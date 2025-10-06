import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  { mockBankApi } from '../api/mockBankApi';
import type { Payee } from '../api/mockBankApi';
import { useTransferStore } from '../stores/transferStore';
import { SelectedAccountCard } from '../components/SelectedAccountCard';
import { PayeeList } from '../components/PayeeList';
import ComponentErrorBoundary from '../components/ComponentErrorBoundary';
import '../styles/payeeSelection.css';
import '../styles/errorState.css';

const PayeeSelection: React.FC = () => {
  const navigate = useNavigate();
  
  const selectedAccount = useTransferStore((state) => state.selectedAccount);
  const payees = useTransferStore((state) => state.payees);
  const payeesError = useTransferStore((state) => state.payeesError);
  const isLoading = useTransferStore((state) => state.isLoadingPayees);
  const canAccessPayee = useTransferStore((state) => state.canAccessPayee);
  const setSelectedPayee = useTransferStore((state) => state.setSelectedPayee);
  const resetToAccount = useTransferStore((state) => state.resetToAccount);
  const setPayees = useTransferStore((state) => state.setPayees);
  const setPayeesError = useTransferStore((state) => state.setPayeesError);
  const setLoadingPayees = useTransferStore((state) => state.setLoadingPayees);

  useEffect(() => {
    // Route guard
    if (!canAccessPayee()) {
      navigate('/account', { replace: true });
      return;
    }

    // Only fetch if we don't have payees cached
    if (payees.length === 0 && !payeesError) {
      setLoadingPayees(true);
      mockBankApi.fetchPayees(100)
        .then(data => {
          setPayees(data);
        })
        .catch(error => {
          console.error('Error fetching payees:', error);
          setPayeesError('Failed to load payees. Please try again.');
        });
    }
  }, [canAccessPayee, navigate]);

  const handleRetry = () => {
    setLoadingPayees(true);
    mockBankApi.fetchPayees(100)
      .then(data => {
        setPayees(data);
      })
      .catch(error => {
        console.error('Error fetching payees:', error);
        setPayeesError('Failed to load payees. Please try again.');
      });
  };


  const handlePayeeSelect = (payee: Payee) => {
    setSelectedPayee(payee);
    navigate('/amount');
  };

  const handleBack = () => {
    resetToAccount();
    navigate('/account');
  };

  if (!selectedAccount) {
    return null;
  }

  return (
    <div className="payee-selection-container">
      <div className="payee-selection-header">
        <button 
          className="back-button"
          onClick={handleBack}
        >
          ← Back
        </button>
        <h1 className="payee-selection-title">Select Payee</h1>
      </div>

      <div className="from-section">
        <h2 className="section-title">From:</h2>
        <ComponentErrorBoundary componentName="Selected Account">
          <SelectedAccountCard account={selectedAccount} />
        </ComponentErrorBoundary>
      </div>

      <div className="to-section">
        <h2 className="section-title">To:</h2>
        <div className="payee-list-container">
          <ComponentErrorBoundary componentName="Payees List">
            <PayeeList
              payees={payees}
              isLoading={isLoading}
              payeesError={payeesError}
              onPayeeSelect={handlePayeeSelect}
              onRetry={handleRetry}
            />
          </ComponentErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default PayeeSelection;
