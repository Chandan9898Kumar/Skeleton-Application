import React, { useEffect, useState } from "react";
import { Skeleton } from "../components/Skeleton";
import { VirtualList } from "../components/VirtualList";
import { mockApi } from "../api/mockApi";
import type { AccountData } from "../api/mockApi";
import type { Transaction } from "../api/mockApi";
import "../styles/account.css";

const TRANSACTION_ITEM_HEIGHT = 80;
const VIRTUAL_LIST_HEIGHT = 500;

const Account: React.FC = () => {
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingAccount, setIsLoadingAccount] = useState(true);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);

  useEffect(() => {
    // Fetch account data
    mockApi
      .fetchAccountData()
      .then((data) => {
        setAccountData(data);
        setIsLoadingAccount(false);
      })
      .catch((error) => {
        console.error("Error fetching account data:", error);
        setIsLoadingAccount(false);
      });

    // Fetch transactions
    mockApi
      .fetchTransactions(200)
      .then((data) => {
        setTransactions(data);
        setIsLoadingTransactions(false);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setIsLoadingTransactions(false);
      });
  }, []);

  const formatCurrency = (amount: number, currency: string = "USD"): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const renderBalanceCard = () => {
    if (isLoadingAccount) {
      return (
        <div className="balance-card-skeleton">
          <Skeleton
            width="120px"
            height="16px"
            style={{ marginBottom: "12px" }}
          />
          <Skeleton
            width="280px"
            height="48px"
            style={{ marginBottom: "24px" }}
          />
          <Skeleton width="200px" height="14px" />
        </div>
      );
    }

    if (!accountData) return null;

    return (
      <div className="balance-card">
        <p className="balance-label">Available Balance</p>
        <h1 className="balance-amount">
          {formatCurrency(accountData.balance, accountData.currency)}
        </h1>
        <p className="account-number">Account: {accountData.accountNumber}</p>
      </div>
    );
  };

  const renderTransactionItem = (
    transaction: Transaction,
    index: number,
    style: React.CSSProperties
  ) => {
    return (
      <div key={transaction.id} className="transaction-item" style={style}>
        <div className={`transaction-icon ${transaction.type}`}>
          {transaction.type === "credit" ? "↓" : "↑"}
        </div>
        <div className="transaction-details">
          <p className="transaction-description">{transaction.description}</p>
          <p className="transaction-date">{formatDate(transaction.date)}</p>
        </div>
        <div className={`transaction-amount ${transaction.type}`}>
          {transaction.type === "credit" ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </div>
      </div>
    );
  };

  const renderTransactionSkeleton = (index: number) => {
    const style: React.CSSProperties = {
      top: index * TRANSACTION_ITEM_HEIGHT,
      height: TRANSACTION_ITEM_HEIGHT,
    };

    return (
      <div
        key={`skeleton-${index}`}
        className="transaction-item-skeleton"
        style={style}
      >
        <Skeleton
          width="48px"
          height="48px"
          variant="circle"
          className="skeleton-icon"
        />
        <div className="skeleton-details">
          <Skeleton width="60%" height="16px" style={{ marginBottom: "8px" }} />
          <Skeleton width="40%" height="14px" />
        </div>
        <Skeleton className="skeleton-amount" />
      </div>
    );
  };

  return (
    <div className="account-container">
      <div className="account-header">
        <h1 className="account-title">My Account</h1>
        <p className="account-subtitle">
          View your balance and recent transactions
        </p>
      </div>

      {renderBalanceCard()}

      <div className="transactions-section">
        <h2 className="transactions-header">Recent Transactions</h2>

        <div className="virtual-list-container">
          {isLoadingTransactions ? (
            <div
              className="virtual-list"
              style={{ height: VIRTUAL_LIST_HEIGHT }}
            >
              <div
                className="virtual-list-content"
                style={{ height: TRANSACTION_ITEM_HEIGHT * 10 }}
              >
                {Array.from({ length: 10 }).map((_, index) =>
                  renderTransactionSkeleton(index)
                )}
              </div>
            </div>
          ) : (
            <VirtualList
              items={transactions}
              itemHeight={TRANSACTION_ITEM_HEIGHT}
              containerHeight={VIRTUAL_LIST_HEIGHT}
              renderItem={renderTransactionItem}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
