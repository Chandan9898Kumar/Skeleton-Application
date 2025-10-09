import { Info } from 'lucide-react';
import type { Payee } from './utils/mockApi';
import './styles/PayeeItem.css';

interface PayeeItemProps {
  payee: Payee;
}

const PayeeItem = ({ payee }: PayeeItemProps) => {
  return (
    <div className="payee-item">
      <div className="payee-content">
        <div className="payee-name">{payee.name}</div>
        <div className="payee-bank">{payee.bank}</div>
        <div className="payee-account">{payee.account}</div>
      </div>
      <button className="payee-info-btn" aria-label="Payee information">
        <Info size={20} />
      </button>
    </div>
  );
};

export default PayeeItem;
