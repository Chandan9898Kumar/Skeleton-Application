import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockBankApi } from "../api/mockBankApi";
import type { BankAccount } from "../api/mockBankApi";
import { useTransferStore } from "../stores/transferStore";
import { AccountsGrid } from "../components/AccountsGrid";
import ComponentErrorBoundary from "../components/ComponentErrorBoundary";
import "../styles/accountSelection.css";
import "../styles/errorState.css";

const AccountSelection: React.FC = () => {
  const navigate = useNavigate();

  const accounts = useTransferStore((state) => state.accounts);
  const accountsError = useTransferStore((state) => state.accountsError);
  const isLoading = useTransferStore((state) => state.isLoadingAccounts);
  const setSelectedAccount = useTransferStore((state) => state.setSelectedAccount);
  const setAccounts = useTransferStore((state) => state.setAccounts);
  const setAccountsError = useTransferStore((state) => state.setAccountsError);
  const setLoadingAccounts = useTransferStore((state) => state.setLoadingAccounts);



// NOTE : These functions setLoadingAccounts,setAccounts,setAccountsError are created ONCE when store is initialized
// So thats the reason it does not create new reference and does not let useEffect run again. They don't change on every render like useState setters would.

  useEffect(() => {
    // Only fetch if we don't have accounts cached
    if (accounts.length === 0 && !accountsError) {
      setLoadingAccounts(true);
      mockBankApi
        .fetchAccounts()
        .then((data) => {
          setAccounts(data);
        })
        .catch((error) => {
          console.error("Error fetching accounts:", error);
          setAccountsError("Failed to load accounts. Please try again.");
        });
    }
  }, [
    accounts.length,
    accountsError,
    setLoadingAccounts,
    setAccounts,
    setAccountsError,
  ]);

  const handleRetry = () => {
    setLoadingAccounts(true);
    mockBankApi
      .fetchAccounts()
      .then((data) => {
        setAccounts(data);
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
        setAccountsError("Failed to load accounts. Please try again.");
      });
  };

  const handleAccountSelect = (account: BankAccount) => {
    setSelectedAccount(account);
    navigate("/payee");
  };
  console.log(accounts, "accounts");
  return (
    <div className="account-selection-container">
      <div className="account-selection-header">
        <h1 className="account-selection-title">Select Account</h1>
        <p className="account-selection-subtitle">
          Choose an account to transfer from
        </p>
      </div>

      <div className="accounts-grid">
        <ComponentErrorBoundary componentName="Accounts List">
          <AccountsGrid
            accounts={accounts}
            isLoading={isLoading}
            accountsError={accountsError}
            onAccountSelect={handleAccountSelect}
            onRetry={handleRetry}
          />
        </ComponentErrorBoundary>
      </div>
    </div>
  );
};

export default AccountSelection;
