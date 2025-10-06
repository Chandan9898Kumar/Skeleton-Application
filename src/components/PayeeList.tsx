import React from 'react';
import type { Payee } from '../api/mockBankApi';
import { VirtualList } from './VirtualList';
import { Skeleton } from './Skeleton';

const PAYEE_ITEM_HEIGHT = 90;
const VIRTUAL_LIST_HEIGHT = 500;

interface PayeeListProps {
  payees: Payee[];
  isLoading: boolean;
  payeesError: string | null;
  onPayeeSelect: (payee: Payee) => void;
  onRetry: () => void;
}

export const PayeeList: React.FC<PayeeListProps> = ({
  payees,
  isLoading,
  payeesError,
  onPayeeSelect,
  onRetry
}) => {
  const renderPayeeItem = (
    payee: Payee,
    index: number,
    style: React.CSSProperties
  ) => {
    console.log(index,'index');
    return (
      <div 
        key={payee.id} 
        className="payee-item"
        style={style}
        onClick={() => onPayeeSelect(payee)}
      >
        <div className="payee-logo">{payee.bankLogo}</div>
        <div className="payee-details">
          <p className="payee-name">{payee.name}</p>
          <p className="payee-bank">{payee.bankName}</p>
          <p className="payee-account">{payee.accountNumber}</p>
        </div>
        <div className="payee-arrow">→</div>
      </div>
    );
  };

  const renderPayeeSkeleton = (index: number) => {
    const style: React.CSSProperties = {
      top: index * PAYEE_ITEM_HEIGHT,
      height: PAYEE_ITEM_HEIGHT
    };

    return (
      <div key={`skeleton-${index}`} className="payee-item-skeleton" style={style}>
        <Skeleton width="60px" height="60px" variant="circle" />
        <div className="payee-skeleton-details">
          <Skeleton width="70%" height="18px" style={{ marginBottom: '8px' }} />
          <Skeleton width="50%" height="16px" style={{ marginBottom: '6px' }} />
          <Skeleton width="60%" height="14px" />
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="virtual-list" style={{ height: VIRTUAL_LIST_HEIGHT }}>
        <div className="virtual-list-content" style={{ height: PAYEE_ITEM_HEIGHT * 10 }}>
          {Array.from({ length: 10 }).map((_, index) => renderPayeeSkeleton(index))}
        </div>
      </div>
    );
  }

  if (payeesError) {
    return (
      <div className="error-state">
        <div className="error-icon">⚠️</div>
        <h2 className="error-title">Unable to Load Payees</h2>
        <p className="error-message">{payeesError}</p>
        <button className="retry-button" onClick={onRetry}>
          Try Again
        </button>
      </div>
    );
  }

  if (payees.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <h2 className="empty-title">No Payees Found</h2>
        <p className="empty-message">You don't have any payees saved yet.</p>
      </div>
    );
  }

  return (
    <VirtualList
      items={payees}
      itemHeight={PAYEE_ITEM_HEIGHT}
      containerHeight={VIRTUAL_LIST_HEIGHT}
      renderItem={renderPayeeItem}
    />
  );
};
