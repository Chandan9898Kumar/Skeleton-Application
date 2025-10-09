import { ChevronDown } from 'lucide-react';
import './styles/AccountCard.css';

const AccountCard = () => {
  return (
    <div className="account-section">
      <label className="account-label">From</label>
      <div className="account-card">
        <div className="account-info">
          <div className="account-icon"></div>
          <div className="account-details">
            <div className="account-number">Current A/C 67776548788</div>
            <div className="account-balance">Balance BHD 93,919.000</div>
          </div>
        </div>
        <button className="account-dropdown" aria-label="Select account">
          <ChevronDown size={20} />
        </button>
      </div>
    </div>
  );
};

export default AccountCard;
