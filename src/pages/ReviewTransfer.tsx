import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { mockBankApi } from "../api/mockBankApi";
import "../styles/reviewTransfer.css";
import type { BankAccount } from "../api/mockBankApi";
import type { Payee } from "../api/mockBankApi";
const ReviewTransfer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedAccount, selectedPayee, amount, purpose, description } =
    location.state as {
      selectedAccount: BankAccount;
      selectedPayee: Payee;
      amount: number;
      purpose: string;
      description?: string;
    };

  const [isProcessing, setIsProcessing] = useState(false);

  const formatCurrency = (amount: number, currency: string = "USD"): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(Math.abs(amount));
  };

  const handleTransfer = async () => {
    setIsProcessing(true);

    try {
      const result = await mockBankApi.processTransfer({
        fromAccount: selectedAccount,
        toPayee: selectedPayee,
        amount,
        purpose,
        description,
      });

      if (result.success) {
        navigate("/success", {
          state: {
            selectedAccount,
            selectedPayee,
            amount,
            purpose,
            description,
            transactionId: result.transactionId,
          },
        });
      } else {
        navigate("/error", {
          state: {
            error: result.error,
            transferData: {
              selectedAccount,
              selectedPayee,
              amount,
              purpose,
              description,
            },
          },
        });
      }
    } catch (error) {
      navigate("/error", {
        state: {
          error: "An unexpected error occurred. Please try again." + { error },
          transferData: {
            selectedAccount,
            selectedPayee,
            amount,
            purpose,
            description,
          },
        },
      });
    }
  };

  if (!selectedAccount || !selectedPayee || !amount) {
    navigate("/account");
    return null;
  }

  return (
    <div className="review-container">
      <div className="review-header">
        <button
          className="back-button"
          onClick={() =>
            navigate("/amount", {
              state: { selectedAccount, selectedPayee },
            })
          }
          disabled={isProcessing}
        >
          ← Back
        </button>
        <h1 className="review-title">Review Transfer</h1>
      </div>

      <div className="review-content">
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
            onClick={handleTransfer}
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
      </div>
    </div>
  );
};

export default ReviewTransfer;
