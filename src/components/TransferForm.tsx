import React, { useState } from "react";

interface TransferFormProps {
  onSubmit: (amount: number, purpose: string, description: string) => void;
}

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

export const TransferForm: React.FC<TransferFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [description, setDescription] = useState("");

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

    onSubmit(numAmount, purpose, description);
  };

  return (
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
  );
};
