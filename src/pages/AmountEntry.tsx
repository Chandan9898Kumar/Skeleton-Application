import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "../styles/amountEntry.css";
import type { BankAccount } from "../api/mockBankApi";
import type { Payee } from "../api/mockBankApi";
const AmountEntry: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedAccount = location.state?.selectedAccount as BankAccount;
  const selectedPayee = location.state?.selectedPayee as Payee;

  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [description, setDescription] = useState("");

  const transferPurposes = [
    "Personal Transfer",
    "Bill Payment",
    "Loan Payment",
    "Investment",
    "Education",
    "Medical",
    "Shopping",
    "Travel",
    "Gift",
    "Other",
  ];

  const formatCurrency = (amount: number, currency: string = "USD"): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(Math.abs(amount));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !purpose) {
      alert("Please fill in all required fields");
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    // Navigate to review page with all transfer data
    navigate("/review", {
      state: {
        selectedAccount,
        selectedPayee,
        amount: numAmount,
        purpose,
        description,
      },
    });
  };

  if (!selectedAccount || !selectedPayee) {
    navigate("/account");
    return null;
  }

  return (
    <div className="amount-entry-container">
      <div className="amount-entry-header">
        <button
          className="back-button"
          onClick={() => navigate("/payee", { state: { selectedAccount } })}
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
              <p
                className={`summary-balance ${
                  selectedAccount.balance < 0 ? "negative" : ""
                }`}
              >
                Available: {selectedAccount.balance < 0 ? "-" : ""}
                {formatCurrency(
                  selectedAccount.balance,
                  selectedAccount.currency
                )}
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

      <form className="amount-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="amount">
            Amount <span className="required">*</span>
          </label>
          <div className="amount-input-wrapper">
            <span className="currency-symbol">$</span>
            <input
              type="number"
              id="amount"
              className="amount-input"
              placeholder="0.00"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="purpose">
            Purpose of Transfer <span className="required">*</span>
          </label>
          <select
            id="purpose"
            className="form-select"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          >
            <option value="">Select a purpose</option>
            {transferPurposes.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description">
            Description (Optional)
          </label>
          <textarea
            id="description"
            className="form-textarea"
            placeholder="Add any additional notes..."
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-button">
          Continue Transfer
        </button>
      </form>
    </div>
  );
};

export default AmountEntry;
