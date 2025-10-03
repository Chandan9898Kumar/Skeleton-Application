import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../components/Skeleton";
import { mockBankApi } from "../api/mockBankApi";
import type { BankAccount } from "../api/mockBankApi";
import "../styles/accountSelection.css";

const AccountSelection: React.FC = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    mockBankApi
      .fetchAccounts()
      .then((data) => {
        setAccounts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
        setIsLoading(false);
      });
  }, []);

  const formatCurrency = (amount: number, currency: string = "USD"): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(Math.abs(amount));
  };

  const handleAccountSelect = (account: BankAccount) => {
    navigate("/payee", { state: { selectedAccount: account } });
  };

  const getAccountTypeLabel = (type: string): string => {
    const labels: { [key: string]: string } = {
      savings: "Savings Account",
      current: "Current Account",
      "credit-card": "Credit Card",
      esaver: "E-Saver Account",
      credit: "Credit Account",
    };
    return labels[type] || type;
  };

  const renderAccountSkeleton = (index: number) => {
    return (
      <div key={`skeleton-${index}`} className="account-card-skeleton">
        <div className="account-card-header-skeleton">
          <Skeleton width="50px" height="50px" variant="circle" />
          <div style={{ flex: 1 }}>
            <Skeleton
              width="60%"
              height="20px"
              style={{ marginBottom: "8px" }}
            />
            <Skeleton width="40%" height="16px" />
          </div>
        </div>
        <div className="account-card-footer-skeleton">
          <Skeleton width="100px" height="32px" />
        </div>
      </div>
    );
  };

  return (
    <div className="account-selection-container">
      <div className="account-selection-header">
        <h1 className="account-selection-title">Select Account</h1>
        <p className="account-selection-subtitle">
          Choose an account to transfer from
        </p>
      </div>

      <div className="accounts-grid">
        {isLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) =>
              renderAccountSkeleton(index)
            )}
          </>
        ) : (
          accounts.map((account) => (
            <div
              key={account.id}
              className="account-card"
              onClick={() => handleAccountSelect(account)}
            >
              <div className="account-card-header">
                <div className="account-icon">{account.icon}</div>
                <div className="account-info">
                  <h3 className="account-type">
                    {getAccountTypeLabel(account.type)}
                  </h3>
                  <p className="account-name">{account.accountName}</p>
                  <p className="account-number">{account.accountNumber}</p>
                </div>
              </div>
              <div className="account-card-footer">
                <span className="account-balance-label">Balance</span>
                <span
                  className={`account-balance ${
                    account.balance < 0 ? "negative" : ""
                  }`}
                >
                  {account.balance < 0 ? "-" : ""}
                  {formatCurrency(account.balance, account.currency)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AccountSelection;
