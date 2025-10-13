import React from 'react';
import type { BankAccount } from '../api/mockBankApi';
import { Skeleton } from './Skeleton';

interface AccountsGridProps {
  accounts: BankAccount[];
  isLoading: boolean;
  accountsError: string | null;
  onAccountSelect: (account: BankAccount) => void;
  onRetry: () => void;
}

export const AccountsGrid: React.FC<AccountsGridProps> = ({
  accounts,
  isLoading,
  accountsError,
  onAccountSelect,
  onRetry
}) => {
  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(Math.abs(amount));
  };

  const getAccountTypeLabel = (type: string): string => {
    const labels: { [key: string]: string } = {
      'savings': 'Savings Account',
      'current': 'Current Account',
      'credit-card': 'Credit Card',
      'esaver': 'E-Saver Account',
      'credit': 'Credit Account'
    };
    return labels[type] || type;
  };

  const renderAccountSkeleton = (index: number) => {
    return (
      <div key={`skeleton-${index}`} className="account-card-skeleton">
        <div className="account-card-header-skeleton">
          <Skeleton width="60px" height="60px" variant="rect" style={{ borderRadius: '12px' }} />
          <div style={{ flex: 1 }}>
            <Skeleton width="40%" height="16px" style={{ marginBottom: '8px' }} />
            <Skeleton width="70%" height="20px" style={{ marginBottom: '6px' }} />
            <Skeleton width="60%" height="16px" />
          </div>
        </div>
        <div className="account-card-footer-skeleton">
          <Skeleton width="30%" height="16px" />
          <Skeleton width="40%" height="24px" />
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, index) => renderAccountSkeleton(index))}
      </>
    );
  }

  if (accountsError) {
    return (
      <div className="error-state">
        <div className="error-icon">⚠️</div>
        <h2 className="error-title">Unable to Load Accounts</h2>
        <p className="error-message">{accountsError}</p>
        <button className="retry-button" onClick={onRetry}>
          Try Again
        </button>
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <h2 className="empty-title">No Accounts Found</h2>
        <p className="empty-message">You don't have any accounts available for transfers.</p>
      </div>
    );
  }

  return (
    <>
      {accounts.map(account => (
        <div 
          key={account.id} 
          className="account-grid-card"
          onClick={() => onAccountSelect(account)}
        >
          <div className="account-card-header">
            <div className="account-icon">{account.icon}</div>
            <div className="account-info">
              <p className="account-type">{getAccountTypeLabel(account.type)}</p>
              <h3 className="account-name">{account.accountName}</h3>
              <p className="account-number">{account.accountNumber}</p>
            </div>
          </div>
          <div className="account-card-footer">
            <span className="account-balance-label">Available Balance</span>
            <span className={`account-balance ${account.balance < 0 ? 'negative' : ''}`}>
              {account.balance < 0 ? '-' : ''}{formatCurrency(account.balance, account.currency)}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};
