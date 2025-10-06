import React from 'react';
import type { BankAccount } from '../api/mockBankApi';

interface SelectedAccountCardProps {
  account: BankAccount;
}

export const SelectedAccountCard: React.FC<SelectedAccountCardProps> = ({ account }) => {
  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(Math.abs(amount));
  };

  return (
    <div className="selected-account-card">
      <div className="account-card-icon">{account.icon}</div>
      <div className="account-card-info">
        <h3 className="account-card-name">{account.accountName}</h3>
        <p className="account-card-number">{account.accountNumber}</p>
        <p className={`account-card-balance ${account.balance < 0 ? 'negative' : ''}`}>
          {account.balance < 0 ? '-' : ''}{formatCurrency(account.balance, account.currency)}
        </p>
      </div>
    </div>
  );
};
