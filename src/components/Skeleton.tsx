import React from 'react';
import '../styles/skeleton.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'text-large' | 'circle' | 'rect';
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  width, 
  height, 
  variant = 'rect',
  className = '',
  style = {}
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'text':
        return 'skeleton-text';
      case 'text-large':
        return 'skeleton-text-large';
      case 'circle':
        return 'skeleton-circle';
      case 'rect':
      default:
        return 'skeleton-rect';
    }
  };

  const combinedStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style
  };

  return (
    <div 
      className={`skeleton ${getVariantClass()} ${className}`}
      style={combinedStyle}
    />
  );
};

export default Skeleton;
