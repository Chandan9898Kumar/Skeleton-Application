import React from "react";
import type { BankAccount, Payee } from "../api/mockBankApi";

interface ReviewDetailsProps {
  selectedAccount: BankAccount;
  selectedPayee: Payee;
  amount: number;
  purpose: string;
  description: string;
  isProcessing: boolean;
  onConfirm: () => void;
}

export const ReviewDetails: React.FC<ReviewDetailsProps> = ({
  selectedAccount,
  selectedPayee,
  amount,
  purpose,
  description,
  isProcessing,
  onConfirm,
}) => {
  const formatCurrency = (amount: number, currency: string = "USD"): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(Math.abs(amount));
  };

  return (
    <>
      <div className="review-section">
        <h2 className="section-title">Transfer Details</h2>

        <div className="detail-card">
          <div className="detail-row">
            <span className="detail-label">From Account:</span>
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
            <span className="detail-label">To Payee:</span>
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

          <div className="detail-row">
            <span className="detail-label">Amount:</span>
            <span className="detail-value amount-highlight">
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

      <div className="review-actions">
        <button
          className="transfer-button"
          onClick={onConfirm}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : (
            "Confirm Transfer"
          )}
        </button>
      </div>
    </>
  );
};
