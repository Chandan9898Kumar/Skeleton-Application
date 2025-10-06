import { create } from "zustand";
import type { BankAccount, Payee } from "../api/mockBankApi";

interface TransferState {
  // State
  selectedAccount: BankAccount | null;
  selectedPayee: Payee | null;
  amount: number | null;
  purpose: string;
  description: string;
  transactionId: string;
  error: string;

  // Cached API data
  accounts: BankAccount[];
  payees: Payee[];
  accountsError: string;
  payeesError: string;
  isLoadingAccounts: boolean;
  isLoadingPayees: boolean;

  // Actions
  setSelectedAccount: (account: BankAccount) => void;
  setSelectedPayee: (payee: Payee) => void;
  setTransferDetails: (
    amount: number,
    purpose: string,
    description: string
  ) => void;
  setTransactionResult: (
    success: boolean,
    transactionId?: string,
    error?: string
  ) => void;

  // API data actions
  setAccounts: (accounts: BankAccount[]) => void;
  setPayees: (payees: Payee[]) => void;
  setAccountsError: (error: string) => void;
  setPayeesError: (error: string) => void;
  setLoadingAccounts: (loading: boolean) => void;
  setLoadingPayees: (loading: boolean) => void;

  // Navigation helpers
  canAccessPayee: () => boolean;
  canAccessAmount: () => boolean;
  canAccessReview: () => boolean;
  canAccessResult: () => boolean;

  // Reset actions
  resetTransfer: () => void;
  resetToAccount: () => void;
  resetToPayee: () => void;
  resetToAmount: () => void;
}

const initialState = {
  selectedAccount: null,
  selectedPayee: null,
  amount: null,
  purpose: "",
  description: "",
  transactionId: "",
  error: "",
  accounts: [],
  payees: [],
  accountsError: "",
  payeesError: "",
  isLoadingAccounts: false,
  isLoadingPayees: false,
};

export const useTransferStore = create<TransferState>((set, get) => ({
  ...initialState,

  setSelectedAccount: (account) =>
    set({
      selectedAccount: account,
      // Reset downstream state when account changes
      selectedPayee: null,
      amount: null,
      purpose: "",
      description: "",
      transactionId: "",
      error: "",
    }),

  setSelectedPayee: (payee) =>
    set({
      selectedPayee: payee,
      // Reset downstream state when payee changes
      amount: null,
      purpose: "",
      description: "",
      transactionId: "",
      error: "",
    }),

  setTransferDetails: (amount, purpose, description) =>
    set({ amount, purpose, description }),

  setTransactionResult: (success = true, transactionId = "", error = "") => {
    console.log(success, "success");
    set({ transactionId, error });
  },

  // API data actions
  setAccounts: (accounts) =>
    set({ accounts, accountsError: "", isLoadingAccounts: false }),

  setPayees: (payees) =>
    set({ payees, payeesError: "", isLoadingPayees: false }),

  setAccountsError: (error) =>
    set({ accountsError: error, isLoadingAccounts: false }),

  setPayeesError: (error) =>
    set({ payeesError: error, isLoadingPayees: false }),

  setLoadingAccounts: (loading) => set({ isLoadingAccounts: loading }),

  setLoadingPayees: (loading) => set({ isLoadingPayees: loading }),

  // Navigation guards
  canAccessPayee: () => {
    const state = get();
    return state.selectedAccount !== null;
  },

  canAccessAmount: () => {
    const state = get();
    return state.selectedAccount !== null && state.selectedPayee !== null;
  },

  canAccessReview: () => {
    const state = get();
    return (
      state.selectedAccount !== null &&
      state.selectedPayee !== null &&
      state.amount !== null &&
      state.amount > 0 &&
      state.purpose !== ""
    );
  },

  canAccessResult: () => {
    const state = get();
    return (
      state.selectedAccount !== null &&
      state.selectedPayee !== null &&
      state.amount !== null &&
      (state.transactionId !== "" || state.error !== "")
    );
  },

  // Reset functions
  resetTransfer: () => set(initialState),

  resetToAccount: () =>
    set({
      selectedAccount: null,
      selectedPayee: null,
      amount: null,
      purpose: "",
      description: "",
      transactionId: "",
      error: "",
    }),

  resetToPayee: () =>
    set({
      selectedPayee: null,
      amount: null,
      purpose: "",
      description: "",
      transactionId: "",
      error: "",
    }),

  resetToAmount: () =>
    set({
      amount: null,
      purpose: "",
      description: "",
      transactionId: "",
      error: "",
    }),
}));
