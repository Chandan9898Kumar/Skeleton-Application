import { CheckCircle2, ArrowRight } from "lucide-react";
import "./TransactionDetails.css";

export interface TransactionDetailsProps {
  from: {
    label: string;
    account: string;
    amount: string;
  };
  to: {
    name: string;
    bank: string;
    iban: string;
    mobile: string;
  };
  details: {
    transferType: string;
    purpose: string;
    note: string;
    date: string;
  };
}

export const TransactionDetails = ({
  from,
  to,
  details,
}: TransactionDetailsProps) => {
  return (
    <div className="transaction-details">
      {/* From Section */}
      <div className="transaction-section">
        <div className="transaction-icon transaction-icon-from">
          <ArrowRight style={{ width: 16, height: 16, color: '#16a34a', transform: 'rotate(-45deg)' }} />
        </div>
        <div className="transaction-content">
          <div className="transaction-label">{from.label}</div>
          <div className="transaction-account">
            {from.account}
          </div>
          <div className="transaction-amount">{from.amount}</div>
        </div>
      </div>

      {/* Vertical Line */}
      <div className="transaction-divider" />

      {/* To Section */}
      <div className="transaction-section">
        <div className="transaction-icon transaction-icon-to">
          <CheckCircle2 style={{ width: 20, height: 20, color: 'white' }} />
        </div>
        <div className="transaction-content">
          <div className="transaction-label">To</div>
          <div className="transaction-name">{to.name}</div>
          <div className="transaction-info">
            {to.bank}
            <br />
            {to.iban}
            <br />
            Mobile {to.mobile}
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="transaction-details-section">
        <div className="transaction-detail-row">
          <span className="transaction-detail-label">Transfer Type</span>
          <span className="transaction-detail-value">{details.transferType}</span>
        </div>
        <div className="transaction-detail-row">
          <span className="transaction-detail-label">Purpose of Transfer</span>
          <span className="transaction-detail-value">{details.purpose}</span>
        </div>
        <div className="transaction-detail-row">
          <span className="transaction-detail-label">Note to Beneficiary</span>
          <span className="transaction-detail-value">{details.note}</span>
        </div>
        <div className="transaction-detail-row">
          <span className="transaction-detail-label">Date</span>
          <span className="transaction-detail-value">{details.date}</span>
        </div>
      </div>
    </div>
  );
};
