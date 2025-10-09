import { CreditCard, Smartphone, FileText, Building2, Landmark } from 'lucide-react';
import './styles/TransferOptions.css';

const TransferOptions = () => {
  const options = [
    { icon: CreditCard, label: 'Pay to IBAN', id: 'iban' },
    { icon: Smartphone, label: 'Pay to Mobile', id: 'mobile' },
    { icon: FileText, label: 'Pay to CPR', id: 'cpr' },
    { icon: Building2, label: 'Pay to CR', id: 'cr' },
    { icon: Landmark, label: 'Pay to Gov', id: 'gov' },
  ];

  return (
    <div className="transfer-options-section">
      <label className="options-label">To</label>
      <p className="options-subtitle">Where would you like to transfer to?</p>
      <div className="transfer-options">
        {options.map((option) => (
          <button key={option.id} className="transfer-option">
            <option.icon size={24} strokeWidth={1.5} />
            <span className="option-label">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransferOptions;
