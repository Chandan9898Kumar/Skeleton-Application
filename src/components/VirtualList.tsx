import React, { useState, useRef, useCallback } from 'react';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number, style: React.CSSProperties) => React.ReactNode;
  className?: string;
  overscan?: number;
}

export function VirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className = '',
  overscan = 3
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const totalHeight = items.length * itemHeight;
  
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = [];
  for (let i = startIndex; i <= endIndex; i++) {
    visibleItems.push({
      item: items[i],
      index: i
    });
  }

  return (
    <div
      ref={containerRef}
      className={`virtual-list ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div 
        className="virtual-list-content"
        style={{ height: totalHeight }}
      >
        {visibleItems.map(({ item, index }) => {
          const style: React.CSSProperties = {
            top: index * itemHeight,
            height: itemHeight
          };
          return renderItem(item, index, style);
        })}
      </div>
    </div>
  );
}

export default VirtualList;
