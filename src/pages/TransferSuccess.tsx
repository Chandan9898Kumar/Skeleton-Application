import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { BankAccount, Payee } from "../api/mockBankApi";
import "../styles/transferResult.css";

const TransferSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    selectedAccount,
    selectedPayee,
    amount,
    purpose,
    description,
    transactionId,
  } = location.state as {
    selectedAccount: BankAccount;
    selectedPayee: Payee;
    amount: number;
    purpose: string;
    description?: string;
    transactionId: string;
  };

  const formatCurrency = (amount: number, currency: string = "USD"): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(Math.abs(amount));
  };

  const formatDate = () => {
    return new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!selectedAccount || !selectedPayee || !amount) {
    navigate("/account");
    return null;
  }

  return (
    <div className="result-container success-page">
      <div className="result-content">
        <div className="result-icon success-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h1 className="result-title">Transfer Successful!</h1>
        <p className="result-message">
          Your transfer has been processed successfully
        </p>

        <div className="result-details">
          <div className="detail-card">
            <div className="detail-header">
              <span className="detail-header-label">Transaction ID</span>
              <span className="detail-header-value">{transactionId}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Date & Time:</span>
              <span className="detail-value">{formatDate()}</span>
            </div>

            <div className="detail-divider"></div>

            <div className="detail-row">
              <span className="detail-label">From:</span>
              <div className="detail-value-card">
                <span className="detail-icon">{selectedAccount.icon}</span>
                <div className="detail-info">
                  <span className="detail-value">
                    {selectedAccount.accountName}
                  </span>
                  <span className="detail-subvalue">
                    {selectedAccount.accountNumber}
                  </span>
                </div>
              </div>
            </div>

            <div className="detail-row">
              <span className="detail-label">To:</span>
              <div className="detail-value-card">
                <span className="detail-icon">{selectedPayee.bankLogo}</span>
                <div className="detail-info">
                  <span className="detail-value">{selectedPayee.name}</span>
                  <span className="detail-subvalue">
                    {selectedPayee.bankName}
                  </span>
                  <span className="detail-subvalue">
                    {selectedPayee.accountNumber}
                  </span>
                </div>
              </div>
            </div>

            <div className="detail-divider"></div>

            <div className="detail-row">
              <span className="detail-label">Amount:</span>
              <span className="detail-value amount-success">
                {formatCurrency(amount, selectedAccount.currency)}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Purpose:</span>
              <span className="detail-value">{purpose}</span>
            </div>

            {description && (
              <div className="detail-row">
                <span className="detail-label">Description:</span>
                <span className="detail-value">{description}</span>
              </div>
            )}
          </div>
        </div>

        <div className="result-actions">
          <button
            className="primary-button"
            onClick={() => navigate("/account")}
          >
            Back to Accounts
          </button>
          <button
            className="secondary-button"
            onClick={() => navigate("/transactions")}
          >
            View Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferSuccess;
