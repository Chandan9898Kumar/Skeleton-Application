import { useEffect, useState, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import PayeeItem from './PayeeItem';
import PayeeSkeleton from './PayeeSkeleton';
import type { Payee } from './utils/mockApi';
import './styles/PayeeList.css';

interface PayeeListProps {
  payees: Payee[];
  isLoading: boolean;
}

const PayeeList = ({ payees, isLoading }: PayeeListProps) => {
  const [listHeight, setListHeight] = useState(500);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateHeight = () => {
      const windowHeight = window.innerHeight;
      const offset = 420; // Approximate height of header + account + options + search
      setListHeight(Math.max(windowHeight - offset, 300));
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, []);

  const virtualizer = useVirtualizer({
    count: payees.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 90,
    overscan: 5,
  });

  if (isLoading) {
    return (
      <div className="payee-list-container">
        {Array.from({ length: 8 }).map((_, index) => (
          <PayeeSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (payees.length === 0) {
    return (
      <div className="payee-list-empty">
        <p>No payees found</p>
      </div>
    );
  }

  return (
    <div 
      ref={parentRef}
      className="payee-list-container"
      style={{
        height: `${listHeight}px`,
        overflow: 'auto',
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <PayeeItem payee={payees[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayeeList;
