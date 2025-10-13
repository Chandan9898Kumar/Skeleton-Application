import React from 'react';
import '../styles/safe-area.css';

interface SafeAreaLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const SafeAreaLayout: React.FC<SafeAreaLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`safe-area-container ${className}`}>
      {children}
    </div>
  );
};

export default SafeAreaLayout;