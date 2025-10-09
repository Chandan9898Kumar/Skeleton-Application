import { useState, useEffect } from 'react';
// import { ArrowLeft, X, Search } from 'lucide-react';
import TransferHeader from './TransferHeader';
import AccountCard from './AccountCard';
import TransferOptions from './TransferOptions';
import SearchBar from './SearchBar';
import PayeeList from './PayeeList';
import { mockFetchPayees } from './utils/mockApi';
import type { Payee } from './utils/mockApi';
import './styles/LocalTransfer.css';

const LocalTransferPayee = () => {
  const [payees, setPayees] = useState<Payee[]>([]);
  const [filteredPayees, setFilteredPayees] = useState<Payee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadPayees();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPayees(payees);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = payees.filter(
        (payee) =>
          payee.name.toLowerCase().includes(query) ||
          payee.account.toLowerCase().includes(query)
      );
      setFilteredPayees(filtered);
    }
  }, [searchQuery, payees]);

  const loadPayees = async () => {
    setIsLoading(true);
    try {
      const data = await mockFetchPayees();
      setPayees(data);
      setFilteredPayees(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    console.log('Navigate back');
  };

  const handleClose = () => {
    console.log('Close transfer');
  };

  return (
    <div className="local-transfer-container">
      <TransferHeader onBack={handleBack} onClose={handleClose} />
      
      <div className="local-transfer-content">
        <AccountCard />
        <TransferOptions />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <PayeeList payees={filteredPayees} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default LocalTransferPayee;
