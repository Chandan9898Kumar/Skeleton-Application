import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { BankAccount, Payee } from "../api/mockBankApi";
import { mockBankApi } from "../api/mockBankApi";
import { Skeleton } from "../components/Skeleton";
import { VirtualList } from "../components/VirtualList";
import "../styles/payeeSelection.css";
const PAYEE_ITEM_HEIGHT = 90;
const VIRTUAL_LIST_HEIGHT = 500;

const PayeeSelection: React.FC = () => {
  const [payees, setPayees] = useState<Payee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedAccount = location.state?.selectedAccount as BankAccount;

  useEffect(() => {
    if (!selectedAccount) {
      navigate("/account");
      return;
    }

    mockBankApi
      .fetchPayees(100)
      .then((data) => {
        setPayees(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching payees:", error);
        setIsLoading(false);
      });
  }, [selectedAccount, navigate]);

  const formatCurrency = (amount: number, currency: string = "USD"): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(Math.abs(amount));
  };

  const handlePayeeSelect = (payee: Payee) => {
    navigate("/amount", {
      state: {
        selectedAccount,
        selectedPayee: payee,
      },
    });
  };

  const renderPayeeItem = (
    payee: Payee,
    index: number,
    style: React.CSSProperties
  ) => {
    return (
      <div
        key={payee.id}
        className="payee-item"
        style={style}
        onClick={() => handlePayeeSelect(payee)}
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
      height: PAYEE_ITEM_HEIGHT,
    };

    return (
      <div
        key={`skeleton-${index}`}
        className="payee-item-skeleton"
        style={style}
      >
        <Skeleton width="60px" height="60px" variant="circle" />
        <div className="payee-skeleton-details">
          <Skeleton width="70%" height="18px" style={{ marginBottom: "8px" }} />
          <Skeleton width="50%" height="16px" style={{ marginBottom: "6px" }} />
          <Skeleton width="60%" height="14px" />
        </div>
      </div>
    );
  };

  if (!selectedAccount) {
    return null;
  }

  return (
    <div className="payee-selection-container">
      <div className="payee-selection-header">
        <button className="back-button" onClick={() => navigate("/account")}>
          ← Back
        </button>
        <h1 className="payee-selection-title">Select Payee</h1>
      </div>

      <div className="from-section">
        <h2 className="section-title">From:</h2>
        <div className="selected-account-card">
          <div className="account-card-icon">{selectedAccount.icon}</div>
          <div className="account-card-info">
            <h3 className="account-card-name">{selectedAccount.accountName}</h3>
            <p className="account-card-number">
              {selectedAccount.accountNumber}
            </p>
            <p
              className={`account-card-balance ${
                selectedAccount.balance < 0 ? "negative" : ""
              }`}
            >
              {selectedAccount.balance < 0 ? "-" : ""}
              {formatCurrency(
                selectedAccount.balance,
                selectedAccount.currency
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="to-section">
        <h2 className="section-title">To:</h2>
        <div className="payee-list-container">
          {isLoading ? (
            <div
              className="virtual-list"
              style={{ height: VIRTUAL_LIST_HEIGHT }}
            >
              <div
                className="virtual-list-content"
                style={{ height: PAYEE_ITEM_HEIGHT * 10 }}
              >
                {Array.from({ length: 10 }).map((_, index) =>
                  renderPayeeSkeleton(index)
                )}
              </div>
            </div>
          ) : (
            <VirtualList
              items={payees}
              itemHeight={PAYEE_ITEM_HEIGHT}
              containerHeight={VIRTUAL_LIST_HEIGHT}
              renderItem={renderPayeeItem}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PayeeSelection;
