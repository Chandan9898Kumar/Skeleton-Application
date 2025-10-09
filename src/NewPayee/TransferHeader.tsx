import { ArrowLeft, X } from 'lucide-react';
import './styles/TransferHeader.css';

interface TransferHeaderProps {
  onBack: () => void;
  onClose: () => void;
}

const TransferHeader = ({ onBack, onClose }: TransferHeaderProps) => {
  return (
    <header className="transfer-header">
      <button className="header-btn" onClick={onBack} aria-label="Go back">
        <ArrowLeft size={24} />
      </button>
      <h1 className="header-title">Local Transfer</h1>
      <button className="header-btn" onClick={onClose} aria-label="Close">
        <X size={24} />
      </button>
    </header>
  );
};

export default TransferHeader;
