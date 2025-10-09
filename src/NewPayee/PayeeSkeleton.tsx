import './styles/PayeeSkeleton.css';

const PayeeSkeleton = () => {
  return (
    <div className="payee-skeleton">
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-name"></div>
        <div className="skeleton-line skeleton-bank"></div>
        <div className="skeleton-line skeleton-account"></div>
      </div>
      <div className="skeleton-icon"></div>
    </div>
  );
};

export default PayeeSkeleton;
